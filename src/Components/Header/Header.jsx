"use client";
import React, { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { useApp } from "../../app/LanguageContext";
import HeaderUz from "../../../locales/uz/Header.json";
import HeaderRu from "../../../locales/ru/Header.json";
import HeaderEn from "../../../locales/en/Header.json";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const { til, changeLanguage, darkMode, toggleDarkMode } = useApp();
    const dropdownRef = useRef(null);

    const languages = [
        { value: "en", label: "English", flag: "/US.png" },
        { value: "ru", label: "Русский", flag: "/RU.png" },
        { value: "uz", label: "O'zbekcha", flag: "/UZ.png" },
    ];

    const selectedLanguage = languages.find((lang) => lang.value === til);

    const handleLanguageChange = (language) => {
        changeLanguage(language);
        setIsLanguageDropdownOpen(false);
    };

    const getHeaderContent = () => {
        switch (til) {
            case "ru":
                return HeaderRu;
            case "en":
                return HeaderEn;
            default:
                return HeaderUz;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsLanguageDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const headerContent = getHeaderContent();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-10 transition-colors duration-300 ${isScrolled
                    ? "bg-white/10 backdrop-blur-md"
                    : darkMode
                        ? "bg-gray-900"
                        : "bg-orange-500"
                }`}
        >
            <div className="container mx-auto flex items-center justify-between p-1.5">
                <Link href="/">
                    <img src="/logo.png" alt="IFLY Tours" className="h-15" />
                </Link>
                <div className="hidden md:flex space-x-4">
                    <Link
                        href="/tours"
                        className="hover:text-yellow-100 text-[17px] lg:text-[22px] text-white font-semibold"
                    >
                        {headerContent.navbar_1}
                    </Link>
                    <Link
                        href="/visa"
                        className="hover:text-yellow-100 text-[17px] lg:text-[22px] text-white font-semibold"
                    >
                        {headerContent.navbar_2}
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-yellow-100 text-[17px] lg:text-[22px] text-white font-semibold"
                    >
                        {headerContent.navbar_3}
                    </Link>
                    <Link
                        href="/contact"
                        className="hover:text-yellow-100 text-[17px] lg:text-[22px] text-white font-semibold"
                    >
                        {headerContent.navbar_4}
                    </Link>
                </div>
                <div className="flex items-center space-x-5 sm:space-x-6 md:space-x-1.5 lg:space-x-4">
                    <div
                        className={`hidden md:flex text-[22px] space-x-1 lg:space-x-4 ${darkMode ? "text-gray-300" : "text-white"
                            }`}
                    >
                        <FaFacebookF />
                        <FaTwitter />
                        <FaInstagram />
                        <FaLinkedinIn />
                        <FaYoutube />
                    </div>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                            className={`flex items-center space-x-2 py-2 px-3 text-sm font-bold rounded-lg transition-colors ${darkMode
                                    ? "bg-gray-900 text-white"
                                    : "bg-orange-500 text-white"
                                }`}
                        >
                            <Image
                                src={selectedLanguage.flag}
                                alt={selectedLanguage.label}
                                width={20}
                                height={20}
                                className="w-4 h-4"
                            />
                            <span>{selectedLanguage.label}</span>
                        </button>

                        {isLanguageDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20">
                                {languages.map((language) => (
                                    <button
                                        key={language.value}
                                        onClick={() => handleLanguageChange(language.value)}
                                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-2xl"
                                    >
                                        <Image
                                            src={language.flag}
                                            alt={language.label}
                                            width={20}
                                            height={20}
                                            className="w-4 h-4"
                                        />
                                        <span>{language.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-[5px] ${darkMode
                                ? "bg-gray-900 hover:bg-gray-800"
                                : "bg-white hover:bg-gray-100"
                            }`}
                    >
                        <MdOutlineEnergySavingsLeaf
                            className={`text-[#F97316] ${darkMode ? "text-yellow-400" : ""}`}
                        />
                    </button>
                    <button
                        className={`md:hidden p-2 rounded-[5px] ${darkMode
                                ? "bg-gray-900 text-white"
                                : "bg-white text-[#F97316]"
                            }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div
                    className={`md:hidden w-full sm:w-[70%] h-screen fixed top-0 right-0 ${darkMode ? "bg-gray-900" : "bg-orange-600"
                        } text-white shadow-2xl p-6 transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex justify-between items-center mb-8">
                        <Link href="/" onClick={() => setIsOpen(false)}>
                            <img src="/logo.png" alt="IFLY Tours" className="h-12" />
                        </Link>
                        <button
                            className={`p-2 rounded-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-orange-600"
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4 text-[18px] font-semibold">
                        <Link
                            href="/tours"
                            className={`py-3 px-4 rounded-xl ${darkMode
                                    ? "bg-gray-800 hover:bg-gray-700"
                                    : "bg-orange-500 hover:bg-orange-700"
                                } transition-colors duration-200`}
                            onClick={() => setIsOpen(false)}
                        >
                            {headerContent.navbar_1}
                        </Link>
                        <Link
                            href="/visa"
                            className={`py-3 px-4 rounded-xl ${darkMode
                                    ? "bg-gray-800 hover:bg-gray-700"
                                    : "bg-orange-500 hover:bg-orange-700"
                                } transition-colors duration-200`}
                            onClick={() => setIsOpen(false)}
                        >
                            {headerContent.navbar_2}
                        </Link>
                        <Link
                            href="/about"
                            className={`py-3 px-4 rounded-xl ${darkMode
                                    ? "bg-gray-800 hover:bg-gray-700"
                                    : "bg-orange-500 hover:bg-orange-700"
                                } transition-colors duration-200`}
                            onClick={() => setIsOpen(false)}
                        >
                            {headerContent.navbar_3}
                        </Link>
                        <Link
                            href="/contact"
                            className={`py-3 px-4 rounded-xl ${darkMode
                                    ? "bg-gray-800 hover:bg-gray-700"
                                    : "bg-orange-500 hover:bg-orange-700"
                                } transition-colors duration-200`}
                            onClick={() => setIsOpen(false)}
                        >
                            {headerContent.navbar_4}
                        </Link>
                    </div>
                    <div className="mt-8 flex justify-center space-x-4">
                        <a
                            href="#"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                }`}
                        >
                            <FaFacebookF size={20} />
                        </a>
                        <a
                            href="#"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                }`}
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="#"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                }`}
                        >
                            <FaInstagram size={20} />
                        </a>
                        <a
                            href="#"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                }`}
                        >
                            <FaLinkedinIn size={20} />
                        </a>
                        <a
                            href="#"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                }`}
                        >
                            <FaYoutube size={20} />
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}