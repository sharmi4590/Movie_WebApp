import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext.js'

function Footer() {
    const { isDarkMode } = useContext(ThemeContext); 

    return (
        <footer className={`py-4 mt-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900'} transition-colors duration-300`}>
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left">
                    <p className="text-sm">&copy; 2024 MovieDB. All rights reserved.</p>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    <a href="/about" className="text-sm hover:underline">About Us</a>
                    <a href="/contact" className="text-sm hover:underline">Contact</a>
                    <a href="/privacy" className="text-sm hover:underline">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
