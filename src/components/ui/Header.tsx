import React from "react";
import { Logo } from "./Logo";

export const KampusHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-20 shadow-sm backdrop-blur-md bg-white/80">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="h-8 w-[1px] bg-gray-200 hidden sm:block" />
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{title}</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">{subtitle}</p>
          </div>
        </div>
        
        {/* Right side is now empty as requested */}
        <div className="flex items-center gap-2">
        </div>
      </div>
    </header>
  );
};
