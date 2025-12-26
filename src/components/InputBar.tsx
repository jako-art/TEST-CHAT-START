import React from "react";
import { Send, Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputBarProps {
  inputValue: string;
  setInputValue: (val: string) => void;
  handleSend: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  isTyping: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export const InputBar = ({
  inputValue,
  setInputValue,
  handleSend,
  handleKeyDown,
  isTyping,
  textareaRef,
}: InputBarProps) => {
  return (
    <footer className="bg-white border-t border-gray-100 p-4 pb-8 md:pb-4 sticky bottom-0">
      <div className="relative flex items-center gap-2 max-w-3xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl px-3 py-1.5 focus-within:border-blue-500 transition-all shadow-sm">
        <textarea
          ref={textareaRef}
          rows={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Опиши свою задачу..."
          className="flex-1 bg-transparent border-none px-2 py-2.5 outline-none resize-none min-h-[44px] max-h-[120px] text-[16px] text-gray-900 placeholder-gray-400"
          disabled={isTyping}
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || isTyping}
          className={cn(
            "p-2 rounded-xl transition-all flex-shrink-0",
            inputValue.trim() && !isTyping 
              ? "bg-blue-600 text-white shadow-md hover:scale-105 active:scale-95" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          {isTyping ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
        </button>
      </div>
    </footer>
  );
};

