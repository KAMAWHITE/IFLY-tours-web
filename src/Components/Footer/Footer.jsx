"use client";
import React from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { useApp } from "../../app/LanguageContext";
import FooterUz from "../../../locales/uz/Footer.json";
import FooterRu from "../../../locales/ru/Footer.json";
import FooterEn from "../../../locales/en/Footer.json";

const Footer = () => {
    const { til, darkMode } = useApp();

    const getFooterContent = () => {
        switch (til) {
            case "ru":
                return FooterRu;
            case "en":
                return FooterEn;
            default:
                return FooterUz;
        }
    };

    const footerContent = getFooterContent();

    return (
        <footer
            className={`py-12 ${darkMode ? "dark bg-gray-800" : "bg-orange-500"}`}
        >
            <div className="container mx-auto px-12 grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Company Info */}
                <div className="md:col-span-2">
                    <div className="mb-4">
                        <Image src="/logo.png" alt="iFLY Logo" width={80} height={80} />
                    </div>
                    <p
                        className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-white"
                            }`}
                    >
                        {footerContent.info}
                    </p>
                    <div className="flex space-x-4">
                        <a
                            href="https://facebook.com/"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-300"
                                }`}
                        >
                            <FaFacebook size={20} />
                        </a>
                        <a
                            href="https://twitter.com/"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-300"
                                }`}
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="https://www.instagram.com/ifly.com.uz/"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-300"
                                }`}
                        >
                            <FaInstagram size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-300"
                                }`}
                        >
                            <FaLinkedin size={20} />
                        </a>
                        <a
                            href="https://youtube.com/"
                            className={`${darkMode ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-300"
                                }`}
                        >
                            <FaYoutube size={20} />
                        </a>
                    </div>
                </div>

                <div>
                    <h4
                        className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-white"
                            }`}
                    >
                        {footerContent.links}
                    </h4>
                    <ul
                        className={`${darkMode ? "text-gray-300" : "text-gray-200"
                            }`}
                    >
                        <li className="mb-2">
                            <a
                                href="#"
                                className={`${darkMode ? "hover:text-white" : "hover:text-white"
                                    }`}
                            >
                                {footerContent.link_1}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`${darkMode ? "hover:text-white" : "hover:text-white"
                                    }`}
                            >
                                {footerContent.link_2}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4
                        className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-white"
                            }`}
                    >
                        {footerContent.locations}
                    </h4>
                    <ul
                        className={`${darkMode ? "text-gray-300" : "text-gray-200"
                            }`}
                    >
                        <li className="mb-2">
                            <a
                                href="#"
                                className={`${darkMode ? "hover:text-white" : "hover:text-white"
                                    }`}
                            >
                                {footerContent.europa}
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="#"
                                className={`${darkMode ? "hover:text-white" : "hover:text-white"
                                    }`}
                            >
                                {footerContent.asia}
                            </a>
                        </li>
                        <li className="mb-2">
                            <a
                                href="#"
                                className={`${darkMode ? "hover:text-white" : "hover:text-white"
                                    }`}
                            >
                                {footerContent.africa}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={`${darkMode ? "hover:text-white" : "hover:text-white"
                                    }`}
                            >
                                {footerContent.australia}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4
                        className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-white"
                            }`}
                    >
                        {footerContent.title}
                    </h4>
                    <p
                        className={`${darkMode ? "text-gray-300" : "text-white"
                            }`} 
                    >
                        {footerContent.text}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;