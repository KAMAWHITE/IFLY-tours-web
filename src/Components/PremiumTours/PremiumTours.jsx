"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useApp } from "../../app/LanguageContext";
import PremiumToursUz from "../../../locales/uz/PremiumTours.json";
import PremiumToursRu from "../../../locales/ru/PremiumTours.json";
import PremiumToursEn from "../../../locales/en/PremiumTours.json";

const PremiumTours = () => {
    const { til, darkMode } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);

    const token = "7147216021:AAGMuN5Lt37qcPAY62u6eccBjVcDKwMK0nE";
    const chatId = "7317699848";

    const getToursData = () => {
        try {
            switch (til) {
                case "ru":
                    return PremiumToursRu?.tours || [];
                case "en":
                    return PremiumToursEn?.tours || [];
                default:
                    return PremiumToursUz?.tours || [];
            }
        } catch (error) {
            console.error("Error loading tours data:", error);
            return [];
        }
    };

    const getTitle = () => {
        switch (til) {
            case "ru":
                return PremiumToursRu?.title || "Bizning Premium Turlarimizni Kashf Etish";
            case "en":
                return PremiumToursEn?.title || "Discover Our Premium Tours";
            default:
                return PremiumToursUz?.title || "Bizning Premium Turlarimizni Kashf Etish";
        }
    };

    const getModalContent = () => {
        switch (til) {
            case "ru":
                return {
                    title: "Отправить сообщение!",
                    nameLabel: "Имя",
                    emailLabel: "Email",
                    subjectLabel: "Тема",
                    messageLabel: "Ваше сообщение",
                    buttonText: "Отправить",
                };
            case "en":
                return {
                    title: "Send a Message!",
                    nameLabel: "Name",
                    emailLabel: "Email",
                    subjectLabel: "Subject",
                    messageLabel: "Your Message",
                    buttonText: "Send",
                };
            default:
                return {
                    title: "Xabar yuboring!",
                    nameLabel: "To'liq ism",
                    emailLabel: "Email",
                    subjectLabel: "Mavzu",
                    messageLabel: "Sizning xabaringiz",
                    buttonText: "Yuborish",
                };
        }
    };

    const tours = getToursData();
    const title = getTitle();
    const modalContent = getModalContent();

    const openModal = (tour) => {
        setSelectedTour(tour);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTour(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");
        const text = `Yangi xabar:\nIsm: ${name}\nEmail: ${email}\nMavzu: ${subject}\nXabar: ${message}`;

        try {
            const response = await fetch(
                `https://api.telegram.org/bot${token}/sendMessage`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: text,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Telegram API so'rovi muvaffaqiyatsiz bo'ldi");
            }

            console.log("Xabar Telegram botiga muvaffaqiyatli yuborildi!");
        } catch (error) {
            console.error("Telegram botiga xabar yuborishda xato:", error);
        }
        closeModal();
    };

    return (
        <div className={`py-10 ${darkMode ? "bg-gray-800" : "bg-orange-500"}`}>
            <h2
                className={`text-center text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-white"
                    }`}
            >
                {title}
            </h2>
            <div className="px-4 py-5">
                {tours.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={3}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop
                        className="max-w-8xl mx-auto h-[350px]"
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3.1,
                            },
                        }}
                    >
                        {tours.map((tour) => (
                            <SwiperSlide key={tour.id}>
                                <div
                                    className={`relative rounded-2xl overflow-hidden transition-transform mt-5 lg:ml-10 duration-300 hover:scale-110 ${darkMode ? "bg-gray-700" : "bg-white"
                                        }`}
                                >
                                    <Image
                                        src={tour.image}
                                        alt={tour.title}
                                        width={500}
                                        height={300}
                                        className="w-full h-64 object-cover hover:scale-105"
                                    />
                                    <div
                                        className={`absolute bottom-0 left-0 w-full p-4 text-white ${darkMode
                                            ? "bg-gradient-to-t from-black/70 to-transparent"
                                            : "bg-gradient-to-t from-black/60 to-transparent"
                                            }`}
                                    >
                                        <h3 className="text-xl font-semibold mb-2">
                                            {tour.title}
                                        </h3>
                                        <p className="text-sm mb-4">{tour.desc}</p>
                                        <button
                                            onClick={() => openModal(tour)}
                                            className={`inline-block py-2 px-4 rounded-full text-sm font-medium ${darkMode
                                                ? "bg-orange-600 hover:bg-orange-800 text-white"
                                                : "bg-orange-500 hover:bg-orange-700 text-white"
                                                }`}
                                            aria-label={`Batafsil ma'lumot olish uchun ${tour.title}`}
                                        >
                                            {tour.buttonText || "Batafsil"}
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className={`text-center ${darkMode ? "text-gray-300" : "text-white"}`}>
                        {til === "ru"
                            ? "Данные загружаются..."
                            : til === "en"
                                ? "Data is loading..."
                                : "Ma'lumotlar yuklanmoqda..."}
                    </p>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative"
                        style={{ zIndex: 60 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">
                                {modalContent.title}
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                                aria-label="Modalni yopish"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={modalContent.nameLabel}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={modalContent.emailLabel}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder={modalContent.subjectLabel}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    name="message"
                                    placeholder={modalContent.messageLabel}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                                    rows="4"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                {modalContent.buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PremiumTours;