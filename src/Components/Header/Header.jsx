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
        { value: "en", label: "English", flag: "/US.jpg" },
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

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsLanguageDropdownOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const headerContent = getHeaderContent();

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled
                ? darkMode
                    ? "bg-gray-900/90 backdrop-blur-md shadow-md"
                    : "bg-white/10 backdrop-blur-md shadow-md"
                : darkMode
                    ? "bg-gray-900"
                    : "bg-orange-500"
                }`}
        >
            <div className="container mx-auto flex items-center justify-between px-4 py-2">
                <a href="#" className="flex items-center" onClick={() => scrollToSection("home")}>
                    <Image
                        src="/logo.png"
                        alt="IFLY Tours"
                        width={48}
                        height={48}
                        quality={100}
                        className="h-12 w-auto"
                    />
                </a>

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

                <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="hidden md:flex items-center space-x-3 text-[20px] text-white">
                        <a
                            href="https://facebook.com/iflytours"
                            aria-label="Facebook sahifamiz"
                            className="hover:text-yellow-200 transition-colors"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://twitter.com/iflytours"
                            aria-label="Twitter sahifamiz"
                            className="hover:text-yellow-200 transition-colors"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://instagram.com/iflytours"
                            aria-label="Instagram sahifamiz"
                            className="hover:text-yellow-200 transition-colors"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://linkedin.com/company/iflytours"
                            aria-label="LinkedIn sahifamiz"
                            className="hover:text-yellow-200 transition-colors"
                        >
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="https://youtube.com/iflytours"
                            aria-label="YouTube kanalimiz"
                            className="hover:text-yellow-200 transition-colors"
                        >
                            <FaYoutube />
                        </a>
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                            aria-expanded={isLanguageDropdownOpen}
                            aria-label="Tilni tanlash"
                            className={`flex items-center space-x-2 px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${darkMode ? "bg-gray-800 text-white" : "bg-orange-600 text-white"
                                }`}
                        >
                            <Image
                                src={selectedLanguage.flag}
                                alt={selectedLanguage.label}
                                width={20}
                                height={20}
                                quality={100}
                                className="w-5 h-5 rounded-full"
                            />
                            <span>{selectedLanguage.label}</span>
                        </button>
                        {isLanguageDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
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
                                            quality={100}
                                            className="w-5 h-5 rounded-full"
                                        />
                                        <span>{language.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={toggleDarkMode}
                        aria-label={darkMode ? "Yorqin rejimga o'tish" : "Qorong'i rejimga o'tish"}
                        className={`p-2 rounded-md transition-colors ${darkMode ? "bg-gray-800 text-yellow-400" : "bg-white text-orange-600"
                            }`}
                    >
                        <MdOutlineEnergySavingsLeaf size={20} />
                    </button>

                    <button
                        className="md:hidden p-2 rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Menyuni yopish" : "Menyuni ochish"}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div
                    className={`md:hidden fixed top-0 right-0 w-full h-screen ${darkMode ? "bg-gray-900" : "bg-orange-600"
                        } text-white p-6 transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "translate-x-full"
                        } z-50 shadow-2xl`}
                >
                    <div className="flex justify-between items-center mb-8">
                        <a href="#" onClick={() => scrollToSection("home")}>
                            <Image
                                src="/logo.png"
                                alt="IFLY Tours"
                                width={48}
                                height={48}
                                quality={100}
                                className="h-12 w-auto"
                            />
                        </a>
                        <button
                            className="p-2 rounded-md bg-orange-700 text-white hover:bg-orange-800"
                            onClick={() => setIsOpen(false)}
                            aria-label="Menyuni yopish"
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
                            href="https://facebook.com/"
                            aria-label="Facebook sahifamiz"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                } transition-colors`}
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://twitter.com/"
                            aria-label="Twitter sahifamiz"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                } transition-colors`}
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://www.instagram.com/ifly.com.uz/"
                            aria-label="Instagram sahifamiz"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                } transition-colors`}
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://linkedin.com/"
                            aria-label="LinkedIn sahifamiz"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                                } transition-colors`}
                        >
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="https://youtube.com/"
                            aria-label="YouTube kanalimiz"
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