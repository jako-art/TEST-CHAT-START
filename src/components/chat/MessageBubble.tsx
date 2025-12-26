import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Message = {
  id: string;
  role: "bot" | "user";
  content: string | React.ReactNode;
  timestamp: Date;
};

export const MessageBubble = ({ message }: { message: Message }) => {
  const isBot = message.role === "bot";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full mb-2",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "message-bubble max-w-[85%] md:max-w-[75%]",
          isBot ? "bot-bubble" : "user-bubble"
        )}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
      </div>
    </motion.div>
  );
};

