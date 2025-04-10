"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useApp } from "../../app/LanguageContext"; // useApp hookini import qilamiz
import PremiumToursUz from "../../../locales/uz/PremiumTours.json";
import PremiumToursRu from "../../../locales/ru/PremiumTours.json";
import PremiumToursEn from "../../../locales/en/PremiumTours.json";

const PremiumTours = () => {
    const { til, darkMode } = useApp(); // til va darkMode'ni olish

    // Get tours data based on current language
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

    // Get title based on current language
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

    const tours = getToursData();
    const title = getTitle();

    return (
        <div
            className={`py-10 ${darkMode ? "bg-gray-800" : "bg-orange-500"}`} // darkMode'ga qarab fon rangi
        >
            <h2
                className={`text-center text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-white"
                    }`} // matn rangi darkMode'da oq bo'lib qoladi
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
                                        }`} // darkMode'ga qarab kartochka foni
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
                                            }`} // darkMode'ga qarab gradient
                                    >
                                        <h3 className="text-xl font-semibold mb-2">
                                            {tour.title}
                                        </h3>
                                        <p className="text-sm mb-4">{tour.desc}</p>
                                        <a
                                            href="#"
                                            className={`inline-block py-2 px-4 rounded-full text-sm font-medium ${darkMode
                                                    ? "bg-orange-600 hover:bg-orange-800 text-white"
                                                    : "bg-orange-500 hover:bg-orange-700 text-white"
                                                }`} // darkMode'ga qarab tugma rangi
                                        >
                                            {tour.buttonText || "Batafsil"}
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p
                        className={`text-center ${darkMode ? "text-gray-300" : "text-white"
                            }`} // darkMode'ga qarab matn rangi
                    >
                        Turlar yuklanmoqda...
                    </p>
                )}
            </div>
        </div>
    );
};

export default PremiumTours;