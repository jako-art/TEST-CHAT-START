import React from "react";
import { motion } from "framer-motion";

const WORK_TYPES = [
  { id: "referat", label: "Реферат", icon: "📚" },
  { id: "doklad", label: "Доклад", icon: "📄" },
  { id: "esse", label: "Эссе", icon: "✍️" },
  { id: "kursovaya", label: "Курсовая", icon: "📁" },
];

export const WorkTypeSelector = ({ onSelect }: { onSelect: (type: string) => void }) => {
  return (
    <div className="grid grid-cols-2 gap-2 my-4 w-full">
      {WORK_TYPES.map((type) => (
        <motion.button
          key={type.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(type.label)}
          className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all text-center gap-2"
        >
          <span className="text-2xl">{type.icon}</span>
          <span className="text-sm font-semibold text-gray-900">{type.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

