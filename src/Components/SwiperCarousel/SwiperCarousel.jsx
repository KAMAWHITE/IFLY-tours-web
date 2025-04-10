"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React from "react";
import { useApp } from "../../app/LanguageContext"; // AppContext'dan useApp import qilamiz
import SwiperCarouselUz from "../../../locales/uz/SwiperCarousel.json";
import SwiperCarouselRu from "../../../locales/ru/SwiperCarousel.json";
import SwiperCarouselEn from "../../../locales/en/SwiperCarousel.json";

export default function SwiperCarousel() {
    const { til, darkMode } = useApp(); // til va darkMode'ni olish

    const getContent = () => {
        switch (til) {
            case "ru":
                return SwiperCarouselRu.Hero;
            case "en":
                return SwiperCarouselEn.Hero;
            default:
                return SwiperCarouselUz.Hero;
        }
    };

    const slides = getContent();

    return (
        <div className="max-w-full">
            <Swiper
                modules={[Pagination, Autoplay, Navigation]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                navigation
                loop={true}
                className={`w-full h-[500px] sm:h-[600px] md:h-[700px] ${darkMode ? "dark" : ""
                    }`} // darkMode'ga qarab class qo'shish
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative w-full h-full">
                        <div className="relative w-full h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover opacity-85 contrast-130 brightness-90"
                            />
                        </div>
                        <div
                            className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 ${darkMode
                                    ? "bg-black/60 text-white"
                                    : "bg-black/40 text-white"
                                }`} // darkMode'ga qarab fon rangi
                        >
                            <h2 className="text-[80px] font-bold drop-shadow-md">
                                {slide.title}
                            </h2>
                            <p className="mt-3 text-[30px] drop-shadow-md">
                                {slide.desc}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}