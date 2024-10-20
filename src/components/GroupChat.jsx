import React, { useState, useEffect } from "react";
import { ChatMessageList } from "./ui/chat/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ui/chat/chat-bubble";
import { ChatInput } from "./ui/chat/chat-input";
import { ScrollArea } from "@/components/ui/scroll-area";

const GroupChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "sent",
      avatar: "US",
      text: "Hello, how has your day been? I hope you are doing well.",
    },
    {
      id: 2,
      type: "received",
      avatar: "AI",
      text: "Hi, I am doing well, thank you for asking. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [newMessageId, setNewMessageId] = useState(null); // Track the ID of the last sent message
  const [animating, setAnimating] = useState(false); // Track animation state

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "sent",
        avatar: "US",
        text: inputValue,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue(""); // Clear input field
      setNewMessageId(newMessage.id); // Set the ID of the new message
      setAnimating(true); // Start animation
    }
  };

  // Effect to reset newMessageId after animation
  useEffect(() => {
    if (newMessageId) {
      const timer = setTimeout(() => {
        setNewMessageId(null); // Reset after animation
        setAnimating(false); // End animation
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
              variant={message.type}
              className={`transition-transform duration-500 ease-in-out ${
                newMessageId === message.id && animating
                  ? "translate-y-10 opacity-0" // Start below and fade out
                  : "translate-y-0 opacity-100" // Final position
              }`}
            >
              <ChatBubbleAvatar fallback={message.avatar} />
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
