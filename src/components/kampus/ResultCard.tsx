import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";

export type ParseResult = {
  workType: string | null;
  topic: string | null;
};

export const ResultCard = ({ result, onGenerate }: { result: ParseResult, onGenerate: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm my-4 w-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
          <FileText size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight">Готово к созданию!</h3>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <CheckCircle2 size={12} className="text-green-500" /> Все параметры определены
          </p>
        </div>
      </div>
      
      <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Тип работы:</span>
          <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg border border-gray-200">{result.workType || "—"}</span>
        </div>
        <div className="space-y-1">
          <span className="text-gray-500 font-medium text-sm">Тема работы:</span>
          <div className="font-semibold text-gray-900 bg-white p-3 rounded-lg border border-gray-200 text-sm italic leading-relaxed">
            «{result.topic || "Тема не определена"}»
          </div>
        </div>
      </div>

      <Button
        onClick={onGenerate}
        className="w-full flex items-center justify-center gap-2"
        size="lg"
      >
        Сгенерировать работу
        <ArrowRight size={20} />
      </Button>
    </motion.div>
  );
};

