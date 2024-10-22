import React, { useState, useEffect, useRef } from "react";
import { ChatMessageList } from "./ui/chat/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
} from "./ui/chat/chat-bubble";
import { ChatInput } from "./ui/chat/chat-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { io } from "socket.io-client"; // Import Socket.IO client
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetGroupMessagesQuery } from "@/services/group";
import { ChatBubbleTimestampCalculation } from "@/lib/utils";

const socket = io("http://localhost:4000");

const GroupChat = () => {
  const { user } = useSelector((state) => state.user.user);
  const { groupId } = useParams();
  const { selectedGroup } = useSelector((state) => state.group);
  const { joinedMember } = selectedGroup || {};
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [newMessageId, setNewMessageId] = useState(null);
  const [animating, setAnimating] = useState(false);
  const messagesEndRef = useRef(null); // Create a ref for the messages end
  const { data: messageHistory, isLoading } =
    useGetGroupMessagesQuery({ groupId }).data || {};

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

  useEffect(() => {
    console.log("messageHistory", messageHistory);
    if (messageHistory) setMessages(messageHistory);
  }, [messageHistory]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        from: user?._id,
        message: inputValue,
        groupId: selectedGroup._id,
        timestamp: new Date().toISOString(),
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
              variant={message?.from === user?._id ? "sent" : "received"}
              className={`transition-transform duration-500 ease-in-out ${
                newMessageId === message._id && animating
                  ? "translate-y-10 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <ChatBubbleAvatar
                src={userLookup[message?.from]?.userAvatar}
                fallback={userLookup[message?.from]?.realName}
              />
              <ChatBubbleMessage variant={message?.type}>
                {message?.message}
                <ChatBubbleTimestamp
                  timestamp={ChatBubbleTimestampCalculation(message?.timestamp)}
                  className={message?.from !== user?._id ? "text-gray-500" : "text-gray-400"}
                />
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
