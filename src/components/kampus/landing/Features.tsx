import React from "react";
import { Brain, Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    title: "Умный контекст",
    description: "Нейросеть понимает специфику учебных предметов и академические стандарты.",
    icon: Brain,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Мгновенный результат",
    description: "Генерация полноценной работы занимает меньше минуты. Экономьте часы времени.",
    icon: Zap,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Уникальность 90%+",
    description: "Все тексты создаются с нуля и проходят проверки на антиплагиат.",
    icon: Shield,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Любые темы",
    description: "От квантовой физики до истории искусств — база знаний охватывает всё.",
    icon: Globe,
    color: "bg-blue-100 text-blue-600",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Почему выбирают Kampus.ai
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы объединили лучшие языковые модели и настроили их специально для студентов и школьников.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

