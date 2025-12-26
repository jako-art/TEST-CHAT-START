import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Анна С.",
    role: "Студентка ВШЭ",
    text: "Kampus.ai спас меня перед сессией. Сделала реферат по экономике за 5 минут, получила 'отлично'.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
  },
  {
    name: "Иван П.",
    role: "11 класс",
    text: "Использую для подготовки к докладам. Тексты очень живые, не скажешь, что писал робот.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan",
  },
  {
    name: "Мария К.",
    role: "Магистрант",
    text: "Лучший инструмент для структурирования мыслей. Помогает собрать скелет для курсовой.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          Отзывы наших пользователей
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 italic mb-6">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

