import React from 'react';
import { Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { language, setLanguage } = useTheme();

  const languages = [
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'ES', flag: '🇪🇸' }
  ];

  return (
    <div className="flex items-center space-x-3">
      {/* Language Selector */}
      <div className="relative group">
        <button className="flex items-center space-x-2 px-3 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all duration-200">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">
            {languages.find(lang => lang.code === language)?.flag}
          </span>
        </button>
        
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code as any)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                language === lang.code 
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      {/* <button
        onClick={toggleTheme}
        className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all duration-200"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </button> */}
    </div>
  );
};

export default ThemeToggle;