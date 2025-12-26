import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 border border-blue-100",
      className
    )}>
      {children}
    </span>
  );
};

