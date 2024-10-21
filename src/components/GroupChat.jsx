import React, { useState, useEffect } from "react";
import { ChatMessageList } from "./ui/chat/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ui/chat/chat-bubble";
import { ChatInput } from "./ui/chat/chat-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { io } from "socket.io-client"; // Import Socket.IO client
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const socket = io("http://localhost:4000");
const GroupChat = () => {
  const { user } = useSelector((state) => state.user.user);
  const { selectedGroup } = useSelector((state) => state.group);
  const { joinedMember } = selectedGroup || {};
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [newMessageId, setNewMessageId] = useState(null);
  const [animating, setAnimating] = useState(false);

  const userLookup = {};
  joinedMember?.forEach((user) => {
    userLookup[user._id] = user;
  });

  // Initialize Socket.IO connection
  useEffect(() => {
    // Listen for incoming messages
    socket.emit("join-room", selectedGroup?._id);

    // Listen for incoming messages
    socket.on("message-received", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, type: "received" },
      ]);
      setNewMessageId(message.id);
      setAnimating(true);
    });

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      socket.off("message-received");
    };
  }, [socket, messages, selectedGroup]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1, // Assign a new ID
        userId: user?._id,
        avatar: "US",
        text: inputValue,
        groupId: selectedGroup._id,
      };
      console.log("newMessage", newMessage);
      // Emit the new message to the server
      socket.emit("send-message", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");
      setNewMessageId(newMessage.id);
      setAnimating(true);
    }
  };

  // Effect to reset newMessageId after animation
  useEffect(() => {
    if (newMessageId) {
      const timer = setTimeout(() => {
        setNewMessageId(null);
        setAnimating(false);
      }, 500); // Duration of the animation

      return () => clearTimeout(timer);
    }
  }, [newMessageId]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold">Group Chat</h1>
      </div>
      <ScrollArea className="flex-1 rounded-md border overflow-auto">
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message?.userId === user?._id ? "sent" : "received"}
              className={`transition-transform duration-500 ease-in-out ${
                newMessageId === message.id && animating
                  ? "translate-y-10 opacity-0" // Start below and fade out
                  : "translate-y-0 opacity-100" // Final position
              }`}
            >
              <ChatBubbleAvatar
                src={userLookup[message.userId].userAvatar}
                fallback={userLookup[message.userId].realName}
              />
              <ChatBubbleMessage variant={message.type}>
                {message.text}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
        </ChatMessageList>
      </ScrollArea>
      <div className="flex p-4">
        <ChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
