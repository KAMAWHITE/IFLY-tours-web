"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useApp } from "../../app/LanguageContext"; // useApp hookini import qilamiz
import CountryInfoUz from "../../../locales/uz/CountryInfo.json";
import CountryInfoRu from "../../../locales/ru/CountryInfo.json";
import CountryInfoEn from "../../../locales/en/CountryInfo.json";

const CountryInfo = () => {
    const { til, darkMode } = useApp(); // til va darkMode'ni olish

    useEffect(() => {
        AOS.init({
            easing: "ease-out-cubic",
            once: true,
            offset: 50,
        });
    }, []);

    // Get country data based on current language
    const getCountryData = () => {
        try {
            switch (til) {
                case "ru":
                    return CountryInfoRu?.Tours || [];
                case "en":
                    return CountryInfoEn?.Tours || [];
                default:
                    return CountryInfoUz?.Tours || [];
            }
        } catch (error) {
            console.error("Error loading country data:", error);
            return [];
        }
    };

    // Get title based on current language
    const getTitle = () => {
        switch (til) {
            case "ru":
                return CountryInfoRu?.BigTitle || "Davlatlarni o'rganing";
            case "en":
                return CountryInfoEn?.BigTitle || "Explore Countries";
            default:
                return CountryInfoUz?.BigTitle || "Davlatlarni o'rganing";
        }
    };

    const countries = getCountryData();
    const title = getTitle();

    return (
        <div className={`${darkMode ? "dark bg-gray-900" : "bg-white"}`}>
            {/* darkMode'ga qarab fon */}
            <div
                data-aos="fade-up"
                className={`items-center text-center pt-10 text-[30px] font-bold ${darkMode ? "text-white" : "text-black"
                    }`} // Sarlavha har doim oq bo'ladi, chunki fon qorong'i
            >
                <h1>{title}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 py-10">
                {countries.length > 0 ? (
                    countries.map((country) => (
                        <div
                            key={country.id}
                            data-aos="fade-up"
                            className={`rounded-xl overflow-hidden shadow-lg`} // Kartochka umumiy konteyneri
                        >
                            <div className="relative">
                                <Image
                                    src={country.image}
                                    alt={country.title}
                                    width={500}
                                    height={300}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                            <div
                                className={`p-4 ${darkMode
                                        ? "bg-gray-800 text-white"
                                        : "bg-gradient-to-r from-orange-400 to-pink-500 text-white"
                                    }`} // Gradient o'rniga qorong'i fon
                            >
                                <h3 className="text-xl font-semibold mb-2">
                                    {country.title}
                                </h3>
                                <p className="mb-4 text-gray-300">
                                    {country.desc}
                                </p>
                                <a
                                    href="#"
                                    className={`py-2 px-4 rounded-full inline-block font-semibold ${darkMode
                                            ? "bg-orange-600 text-white"
                                            : "bg-white text-black"
                                        }`} // darkMode'ga qarab tugma rangi
                                >
                                    {country.buttonText || "Batafsil"}
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p
                        className={`text-center col-span-3 ${darkMode ? "text-gray-300" : "text-gray-300"
                            }`} // darkMode'ga qarab matn rangi
                    >
                        Ma'lumotlar yuklanmoqda...
                    </p>
                )}
            </div>
        </div>
    );
};

export default CountryInfo;