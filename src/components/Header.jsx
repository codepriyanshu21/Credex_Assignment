import React from 'react';
import { Sun, Moon } from 'lucide-react';

const Header = ({ toggleDarkMode, darkMode }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md bg-blue-600 dark:bg-gray-800 text-white">
      <div className="text-2xl font-bold">SoftSell</div>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full hover:bg-white/10 transition"
      >
        {darkMode ? <Sun size={22} /> : <Moon size={22} />}
      </button>
    </header>
  );
};

export default Header;
