import React from "react";

export const ChatLayout = ({ children, headerTitle, headerSubtitle }: { 
  children: React.ReactNode;
  headerTitle: string;
  headerSubtitle: string;
}) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-2xl mx-auto shadow-xl relative overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-lg font-bold text-gray-900 leading-tight">{headerTitle}</h1>
        <p className="text-sm text-gray-500">{headerSubtitle}</p>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar">
        {children}
      </main>
    </div>
  );
};

