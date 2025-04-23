"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useApp } from "../../app/LanguageContext";
import CountryInfoUz from "../../../locales/uz/CountryInfo.json";
import CountryInfoRu from "../../../locales/ru/CountryInfo.json";
import CountryInfoEn from "../../../locales/en/CountryInfo.json";
import InfoUz from "../../../locales/uz/Info.json";
import InfoRu from "../../../locales/ru/Info.json";
import InfoEn from "../../../locales/en/Info.json";

const CountryInfo = () => {
    const { til, darkMode } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        AOS.init({
            easing: "ease-out-cubic",
            once: true,
            offset: 50,
        });
    }, []);

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

    const getModalContent = (country) => {
        let modalData = {};
        try {
            switch (til) {
                case "ru":
                    modalData = InfoRu?.Country_info?.find((item) => item.id === country.id) || {};
                    break;
                case "en":
                    modalData = InfoEn?.Country_info?.find((item) => item.id === country.id) || {};
                    break;
                default:
                    modalData = InfoUz?.Country_info?.find((item) => item.id === country.id) || {};
                    break;
            }
        } catch (error) {
            console.error("Error loading modal content from Info JSON:", error);
        }

        return {
            img: modalData.img || "/placeholder.jpg",
            title: modalData.title || "Noma'lum",
            desc: modalData.text || "Ma'lumot topilmadi",
            population: modalData.aholi || "Noma'lum",
            area: modalData.hudud || "Noma'lum",
            cities: modalData.shaxarlar || "Noma'lum",
            currency: modalData.valyuta || "Noma'lum",
            closeButton: modalData.btn1 || (til === "ru" ? "ЗАКРЫТЬ" : til === "en" ? "CLOSE" : "YOPISH"),
            contactButton: modalData.btn2 || (til === "ru" ? "СВЯЗАТЬСЯ" : til === "en" ? "CONTACT" : "ALOQAGA CHIQISH"),
        };
    };

    const countries = getCountryData();
    const title = getTitle();

    const openModal = (country) => {
        setSelectedCountry(country);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCountry(null);
    };

    const handleContact = () => {
        console.log("Aloqaga chiqish tugmasi bosildi:", selectedCountry);
        closeModal();
    };

    return (
        <div className={`${darkMode ? "dark bg-gray-900" : "bg-white"}`}>
            <div
                data-aos="fade-up"
                className={`items-center text-center pt-10 text-[30px] font-bold ${darkMode ? "text-white" : "text-black"
                    }`}
            >
                <h1>{title}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 py-10">
                {countries.length > 0 ? (
                    countries.map((country) => (
                        <div
                            key={country.id}
                            data-aos="fade-up"
                            className={`rounded-xl overflow-hidden shadow-lg`}
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
                                    }`}
                            >
                                <h3 className="text-xl font-semibold mb-2">{country.title}</h3>
                                <p className="mb-4 text-gray-300">{country.desc}</p>
                                <button
                                    onClick={() => openModal(country)}
                                    className={`py-2 px-4 rounded-full inline-block font-semibold ${darkMode
                                        ? "bg-orange-600 text-white"
                                        : "bg-white text-black"
                                        }`}
                                    aria-label={`Batafsil ma'lumot olish uchun ${country.title}`}
                                >
                                    {country.buttonText || "Batafsil"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p
                        className={`text-center col-span-3 ${darkMode ? "text-gray-300" : "text-gray-300"
                            }`}
                    >
                        {til === "ru"
                            ? "Данные загружаются..."
                            : til === "en"
                                ? "Data is loading..."
                                : "Ma'lumotlar yuklanmoqda..."}
                    </p>
                )}
            </div>

            {isModalOpen && selectedCountry && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative"
                        style={{ zIndex: 60 }}
                    >
                        <Image
                            src={getModalContent(selectedCountry).img}
                            alt={getModalContent(selectedCountry).title}
                            width={500}
                            height={300}
                            className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {getModalContent(selectedCountry).title}
                            </h3>
                            <p className="text-gray-600 text-center mb-4">
                                {getModalContent(selectedCountry).desc}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>{getModalContent(selectedCountry).population.split(": ")[0] + ":"}</strong>{" "}
                                {getModalContent(selectedCountry).population.split(": ")[1] || "Noma'lum"}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>{getModalContent(selectedCountry).area.split(": ")[0] + ":"}</strong>{" "}
                                {getModalContent(selectedCountry).area.split(": ")[1] || "Noma'lum"}
                            </p>
                            <p className="text-gray-600 mb-2">
                                <strong>{getModalContent(selectedCountry).cities.split(": ")[0] + ":"}</strong>{" "}
                                {getModalContent(selectedCountry).cities.split(": ")[1] || "Noma'lum"}
                            </p>
                            <p className="text-gray-600 mb-4">
                                <strong>{getModalContent(selectedCountry).currency.split(": ")[0] + ":"}</strong>{" "}
                                {getModalContent(selectedCountry).currency.split(": ")[1] || "Noma'lum"}
                            </p>
                            <div className="flex space-x-4">
                                <button
                                    onClick={closeModal}
                                    className="py-2 px-6 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                                    aria-label="Modalni yopish"
                                >
                                    {getModalContent(selectedCountry).closeButton}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CountryInfo;