import React, { useState, useEffect, useRef } from "react";
import { ChatMessageList } from "./ui/chat/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
} from "./ui/chat/chat-bubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { io } from "socket.io-client"; // Import Socket.IO client
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetGroupMessagesQuery } from "@/services/group";
import { ChatBubbleTimestampCalculation } from "@/lib/utils";
import { Button } from "./ui/button";
import { Send, Smile } from "lucide-react";
import { Input } from "./ui/input";
import EmojiPicker from "emoji-picker-react"; // Import the emoji picker
import GroupHeader from "./GroupHeader";

const socket = io(import.meta.env.VITE_CLIENT_URL||"http://localhost:4000");

const GroupChat = () => {
  const { user } = useSelector((state) => state.user.user);
  const { groupId } = useParams();
  const { selectedGroup } = useSelector((state) => state.group);
  const { joinedMember } = selectedGroup || {};
  const emojiPickerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [newMessageId, setNewMessageId] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false); // State to show/hide emoji picker
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
      setShowEmoji(false);
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

  // Handle clicks outside the emoji picker
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmoji(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiPickerRef]);

  const onEmojiClick = (event) => {
    setInputValue((prevInput) => prevInput + event.emoji); // Append the emoji to inputValue
  };

  return (
    <div className="flex flex-col h-full relative">
      {" "}
      {/* Added relative to the parent */}
      <GroupHeader selectedGroup={selectedGroup} />
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
              <ChatBubbleMessage
                variant={message?.type}
                senderName={userLookup[message?.from]?.realName}
                senderNameClass={
                  message?.from !== user?._id
                    ? "text-gray-500"
                    : "text-gray-400"
                }
                senderNameLink={`https://leetcode.com/u/${
                  userLookup[message?.from]?.username
                }/`}
              >
                {message?.message}
                <ChatBubbleTimestamp
                  timestamp={ChatBubbleTimestampCalculation(message?.timestamp)}
                  className={
                    message?.from !== user?._id
                      ? "text-gray-500"
                      : "text-gray-400"
                  }
                />
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          {/* Reference element for auto-scrolling */}
          <div ref={messagesEndRef} />
        </ChatMessageList>
      </ScrollArea>
      <div className="flex justify-center items-center gap-3 p-3 relative">
        {" "}
        {/* Added relative */}
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          className="rounded-lg"
        />
        <Smile onClick={() => setShowEmoji((prev) => !prev)} />
        {showEmoji && (
          <div ref={emojiPickerRef} className="absolute bottom-20 right-4">
            {" "}
            {/* Add ref here */}
            <EmojiPicker onEmojiClick={onEmojiClick} skinTonesDisabled={true} />
          </div>
        )}
        <Button
          size="icon"
          disabled={!inputValue}
          onClick={handleSendMessage}
          variant="ghost"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GroupChat;
