import React from "react";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon Container - White rounded square */}
      <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
        {/* The Black Logo Mark - Precise "K" cutout shape */}
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M6 4.5H17.5L12.5 12L17.5 19.5H6V4.5Z" 
            fill="black"
          />
        </svg>
      </div>
      
      {/* Text Container */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-gray-900 tracking-tighter">
          Кэмп
        </span>
        <span className="text-sm text-gray-400 font-medium tracking-tight">
          /ex.кампус
        </span>
      </div>
    </div>
  );
};
