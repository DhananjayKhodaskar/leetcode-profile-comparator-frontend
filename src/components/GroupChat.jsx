import React, { useState, useEffect, useRef } from "react";
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
  const messagesEndRef = useRef(null); // Create a ref for the messages end

  const userLookup = {};
  joinedMember?.forEach((user) => {
    userLookup[user._id] = user;
  });

  // Initialize Socket.IO connection
  useEffect(() => {
    if (selectedGroup?._id) {
      socket.emit("join-room", selectedGroup._id);
    }

    socket.on("message-received", (message) => {
      console.log("message-received", message);
      setMessages((prevMessages) => [...prevMessages, { ...message }]);
      setNewMessageId(message._id);
      setAnimating(true);
    });

    return () => {
      socket.off("message-received");
    };
  }, [selectedGroup]);

  // Effect to auto-scroll when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        userId: user?._id,
        text: inputValue,
        groupId: selectedGroup._id,
        timeStamp: new Date(),
        _id: Date.now().toString(), // Temporary ID until the server response
      };

      socket.emit("send-message", newMessage);
      setInputValue("");
      setNewMessageId(newMessage._id);
      setAnimating(true);
    }
  };

  // Effect to reset newMessageId after animation
  useEffect(() => {
    if (newMessageId) {
      const timer = setTimeout(() => {
        setNewMessageId(null);
        setAnimating(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [newMessageId]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold">{selectedGroup?.name}</h1>
      </div>
      <ScrollArea className="flex-1 rounded-md border overflow-auto">
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message._id}
              variant={message?.userId === user?._id ? "sent" : "received"}
              className={`transition-transform duration-500 ease-in-out ${
                newMessageId === message._id && animating
                  ? "translate-y-10 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <ChatBubbleAvatar
                src={userLookup[message.userId]?.userAvatar}
                fallback={userLookup[message.userId]?.realName}
              />
              <ChatBubbleMessage variant={message.type}>
                {message.text}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          {/* Reference element for auto-scrolling */}
          <div ref={messagesEndRef} />
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
