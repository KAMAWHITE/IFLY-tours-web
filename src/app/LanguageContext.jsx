"use client"
import React, { useState, useEffect, createContext, useContext } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
    // Til holati
    const [til, setTil] = useState('uz');
    // Tema holati (dark mode yoki yo'q)
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Saqlangan parametrlarni yuklash
        const savedLanguage = localStorage.getItem('language');
        const savedTheme = localStorage.getItem('theme');

        if (savedLanguage) setTil(savedLanguage);
        if (savedTheme === 'dark') setDarkMode(true);
    }, []);

    useEffect(() => {
        // Parametrlarni saqlash
        localStorage.setItem('language', til);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');

        // Tema klassini qo'shish/olib tashlash
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [til, darkMode]);

    // Tilni o'zgartirish funktsiyasi
    const changeLanguage = (newLanguage) => {
        setTil(newLanguage);
    };

    // Tema o'zgartirish funktsiyasi
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <AppContext.Provider value={{ til, changeLanguage, darkMode, toggleDarkMode }}>
            {children}
        </AppContext.Provider>
    );
}

function useApp() {
    return useContext(AppContext);
}

export { AppProvider, useApp };