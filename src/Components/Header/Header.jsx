"use client";
import React, { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
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

    // Silliq skroll funksiyasi
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false); // Mobil menyuni yopish
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
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled
                    ? "bg-white/10 backdrop-blur-md shadow-md"
                    : darkMode
                        ? "bg-gray-900"
                        : "bg-orange-500"
                }`}
        >
            <div className="container mx-auto flex items-center justify-between px-4 py-2">
                <a href="#" className="flex items-center" onClick={() => scrollToSection("home")}>
                    <img src="/logo.png" alt="IFLY Tours" className="h-12" />
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {[
                        { href: "tours", label: headerContent.navbar_1 },
                        { href: "visa", label: headerContent.navbar_2 },
                        { href: "about", label: headerContent.navbar_3 },
                        { href: "contact", label: headerContent.navbar_4 },
                    ].map((item) => (
                        <a
                            key={item.href}
                            href={`#${item.href}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(item.href);
                            }}
                            className="text-white text-[18px] lg:text-[20px] font-semibold hover:text-yellow-200 transition-colors duration-200"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                {/* Right Section: Social Icons, Language, Dark Mode, Mobile Menu Button */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                    {/* Social Icons */}
                    <div className="hidden md:flex items-center space-x-3 text-[20px] text-white">
                        <a href="#" className="hover:text-yellow-200 transition-colors">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-yellow-200 transition-colors">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:text-yellow-200 transition-colors">
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:text-yellow-200 transition-colors">
                            <FaLinkedinIn />
                        </a>
                        <a href="#" className="hover:text-yellow-200 transition-colors">
                            <FaYoutube />
                        </a>
                    </div>

                    {/* Language Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                            className={`flex items-center space-x-2 px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${darkMode ? "bg-gray-800 text-white" : "bg-orange-600 text-white"
                                }`}
                        >
                            <Image
                                src={selectedLanguage.flag}
                                alt={selectedLanguage.label}
                                width={20}
                                height={20}
                                className="w-5 h-5 rounded-full"
                            />
                            <span>{selectedLanguage.label}</span>
                        </button>
                        {isLanguageDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-20 overflow-hidden">
                                {languages.map((language) => (
                                    <button
                                        key={language.value}
                                        onClick={() => handleLanguageChange(language.value)}
                                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 transition-colors"
                                    >
                                        <Image
                                            src={language.flag}
                                            alt={language.label}
                                            width={20}
                                            height={20}
                                            className="w-5 h-5 rounded-full"
                                        />
                                        <span>{language.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-md transition-colors ${darkMode ? "bg-gray-800 text-yellow-400" : "bg-white text-orange-600"
                            }`}
                    >
                        <MdOutlineEnergySavingsLeaf size={20} />
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    className={`md:hidden fixed top-0 right-0 w-full sm:w-3/4 h-screen ${darkMode ? "bg-gray-900" : "bg-orange-600"
                        } text-white p-6 transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "translate-x-full"
                        } z-40 shadow-2xl`}
                >
                    <div className="flex justify-between items-center mb-8">
                        <a href="#" onClick={() => scrollToSection("home")}>
                            <img src="/logo.png" alt="IFLY Tours" className="h-12" />
                        </a>
                        <button
                            className="p-2 rounded-md bg-orange-700 text-white hover:bg-orange-800"
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4 text-[18px] font-semibold">
                        {[
                            { href: "tours", label: headerContent.navbar_1 },
                            { href: "visa", label: headerContent.navbar_2 },
                            { href: "about", label: headerContent.navbar_3 },
                            { href: "contact", label: headerContent.navbar_4 },
                        ].map((item) => (
                            <a
                                key={item.href}
                                href={`#${item.href}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.href);
                                }}
                                className={`py-3 px-4 rounded-lg ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-orange-500 hover:bg-orange-700"
                                    } transition-colors duration-200`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center space-x-4 text-[20px]">
                        <a
                            href="#"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                } transition-colors`}
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                } transition-colors`}
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                } transition-colors`}
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="#"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                } transition-colors`}
                        >
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="#"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                } transition-colors`}
                        >
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}