// src/components/ToggleButton.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ToggleButton = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-4 right-4 p-3 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg focus:outline-none transition-colors duration-300 z-50"
    >
      {isDarkMode ? (
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1M12 20v1M4.22 4.22l.71.71M19.07 19.07l.71.71M3 12h1M20 12h1M4.22 19.07l.71-.71M19.07 4.22l.71-.71"></path>
        </svg>
      ) : (
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1M12 20v1M4.22 4.22l.71.71M19.07 19.07l.71.71M3 12h1M20 12h1M4.22 19.07l.71-.71M19.07 4.22l.71-.71"></path>
        </svg>
      )}
    </button>
  );
};

export default ToggleButton;
