import React from "react";
import { Button } from "../../ui/Button";
import { Sparkles, ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
            <Sparkles size={16} />
            <span>Нейросеть нового поколения</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
            Твой персональный <br />
            <span className="text-blue-600">AI-ассистент</span> для учебы
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10 leading-relaxed">
            Создавай рефераты, эссе, доклады и презентации за считанные секунды. 
            Kampus.ai помогает учиться эффективнее, автоматизируя рутину.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto px-8">
              Попробовать бесплатно
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 flex items-center gap-2">
              Смотреть демо
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
      </div>
    </div>
  );
};

