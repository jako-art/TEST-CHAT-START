"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageBubble, type Message } from "@/components/chat/MessageBubble";
import { ChatInput } from "@/components/chat/ChatInput";
import { ResultCard } from "@/components/kampus/ResultCard";
import { WorkTypeSelector } from "@/components/kampus/WorkTypeSelector";
import { Button } from "@/components/ui/Button";
import { KampusHeader } from "@/components/ui/Header";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Я нейросеть Kampus. Чем могу тебе помочь?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showStartBtn, setShowStartBtn] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const addMessage = (role: "bot" | "user", content: string | React.ReactNode) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleStart = () => {
    setShowStartBtn(false);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      addMessage("bot", "Напиши тему работы и формат");
    }, 800);
  };

  const parseText = async (text: string) => {
    setIsTyping(true);
    try {
      const response = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      
      setIsTyping(false);

      if (!data.workType && !data.topic) {
        addMessage("bot", (
          <div className="space-y-4">
            <p>Я не совсем понял, что именно нужно. Пожалуйста, выбери тип работы или напиши тему.</p>
            <WorkTypeSelector onSelect={(type) => {
              addMessage("user", `Тип работы: ${type}`);
              parseText(`${text} ${type}`);
            }} />
          </div>
        ));
        return;
      }

      if (!data.workType) {
        addMessage("bot", (
          <div className="space-y-4">
            <p>Какой тип работы нужен? Выбери один из вариантов:</p>
            <WorkTypeSelector onSelect={(type) => {
              addMessage("user", `Мне нужен ${type}`);
              parseText(`${text} ${type}`);
            }} />
          </div>
        ));
        return;
      }

      if (!data.topic) {
        addMessage("bot", "Какая тема работы? Пожалуйста, напиши тему подробнее.");
        return;
      }

      addMessage("bot", (
        <ResultCard 
          result={{ workType: data.workType, topic: data.topic }} 
          onGenerate={() => {
            const url = `https://kampus.ai?workType=${encodeURIComponent(data.workType)}&topic=${encodeURIComponent(data.topic)}`;
            window.location.href = url;
          }} 
        />
      ));
      
    } catch (error) {
      console.error("Parse error:", error);
      setIsTyping(false);
      addMessage("bot", "Извини, произошла ошибка. Давай попробуем еще раз?");
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const text = inputValue.trim();
    setInputValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    
    addMessage("user", text);
    setShowStartBtn(false);

    await parseText(text);
  };

  return (
    <div className="flex flex-col h-screen bg-[#FCFCFD]">
      <KampusHeader 
        title="Создание текстовых работ" 
        subtitle="Нейросеть Kampus"
      />

      <main className="flex-1 overflow-y-auto px-4 py-6 no-scrollbar">
        <div className="max-w-3xl mx-auto flex flex-col min-h-full">
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            
            {showStartBtn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start mb-4 px-2"
              >
                <Button
                  variant="outline"
                  onClick={handleStart}
                  className="rounded-full px-8"
                >
                  Начать
                </Button>
              </motion.div>
            )}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-start mb-4"
              >
                <div className="bot-bubble message-bubble flex items-center gap-1.5 py-3 px-5">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>
      </main>

      <div className="max-w-3xl mx-auto w-full">
        <ChatInput 
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          isTyping={isTyping}
          textareaRef={textareaRef}
        />
      </div>
    </div>
  );
}
