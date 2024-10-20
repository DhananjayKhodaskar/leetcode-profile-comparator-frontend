import React from "react";
import { ChatMessageList } from "./ui/chat/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ui/chat/chat-bubble";
import { ChatInput } from "./ui/chat/chat-input";
import { ScrollArea } from "@/components/ui/scroll-area";

const GroupChat = () => {
  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 rounded-md border overflow-auto">
        <ChatMessageList>
          <ChatBubble variant="sent">
            <ChatBubbleAvatar fallback="US" />
            <ChatBubbleMessage variant="sent">
              Hello, how has your day been? I hope you are doing well.
            </ChatBubbleMessage>
          </ChatBubble>
          <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="AI" />
            <ChatBubbleMessage variant="received">
              Hi, I am doing well, thank you for asking. How can I help you
              today?
            </ChatBubbleMessage>
          </ChatBubble>
          {/* More ChatBubbles */}
        </ChatMessageList>
      </ScrollArea>
      <ChatInput
        placeholder="Type your message here..."
        className="rounded-full flex flex-row justify-center items-center"
      />
    </div>
  );
};

export default GroupChat;
