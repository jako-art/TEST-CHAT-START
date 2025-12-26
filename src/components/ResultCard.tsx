import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export type ParseResult = {
  workType: string | null;
  topic: string | null;
};

export const ResultCard = ({ result, onGenerate }: { result: ParseResult, onGenerate: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm my-4 w-full"
    >
      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Готово к созданию!</h3>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Тип работы:</span>
          <span className="font-medium text-gray-900">{result.workType || "Не определен"}</span>
        </div>
        <div className="flex justify-between items-start text-sm">
          <span className="text-gray-500 shrink-0 mr-4">Тема:</span>
          <span className="font-medium text-gray-900 text-right">{result.topic || "Не определена"}</span>
        </div>
      </div>
      <button
        onClick={onGenerate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-[0.98]"
      >
        Сгенерировать работу
        <ArrowRight size={18} />
      </button>
    </motion.div>
  );
};

