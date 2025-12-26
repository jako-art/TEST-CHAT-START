import React from "react";
import { Logo } from "../../ui/Logo";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo />
          <div className="flex gap-8 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">О сервисе</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Тарифы</a>
            <a href="#" className="hover:text-blue-600 transition-colors">API</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Поддержка</a>
          </div>
          <p className="text-gray-400 text-xs">
            © 2025 Kampus.ai. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

