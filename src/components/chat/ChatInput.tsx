import React from "react";
import { Send, Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isTyping: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export const ChatInput = ({
  value,
  onChange,
  onSend,
  isTyping,
  textareaRef,
}: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-100 p-4 pb-8 md:pb-6 sticky bottom-0 z-20">
      <div className="relative flex items-center gap-2 max-w-3xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-sm">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Опиши свою задачу..."
          className="flex-1 bg-transparent border-none px-2 py-2.5 outline-none resize-none min-h-[44px] max-h-[120px] text-[16px] text-gray-900 placeholder-gray-400"
          disabled={isTyping}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || isTyping}
          className={cn(
            "p-2.5 rounded-xl transition-all flex-shrink-0",
            value.trim() && !isTyping 
              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 active:scale-95" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          {isTyping ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
        </button>
      </div>
    </div>
  );
};

