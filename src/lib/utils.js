import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const ChatBubbleTimestampCalculation = (timestamp) => {
  const now = new Date();
  const messageDate = new Date(timestamp);

  // Check if the message is from today
  const isToday = now.toDateString() === messageDate.toDateString();

  // Check if the message is from yesterday
  const isYesterday =
    new Date(now.setDate(now.getDate() - 1)).toDateString() ===
    messageDate.toDateString();

  let displayTime;

  if (isToday) {
    // Format time for today
    displayTime = messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (isYesterday) {
    // Display "Yesterday"
    displayTime = "Yesterday";
  } else {
    // Display full date and time for older dates
    displayTime = messageDate.toLocaleString();
  }

  return displayTime; // Return the displayTime value
};



