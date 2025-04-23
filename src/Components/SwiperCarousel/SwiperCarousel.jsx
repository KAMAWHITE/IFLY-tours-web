"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React from "react";
import { useApp } from "../../app/LanguageContext";
import SwiperCarouselUz from "../../../locales/uz/SwiperCarousel.json";
import SwiperCarouselRu from "../../../locales/ru/SwiperCarousel.json";
import SwiperCarouselEn from "../../../locales/en/SwiperCarousel.json";

export default function SwiperCarousel() {
    const { til, darkMode } = useApp();

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
                    }`}
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
                                }`}
                        >
                            <h2 className="text-[40px] sm:text-[60px] font-bold drop-shadow-md">
                                {slide.title}
                            </h2>
                            <p className="mt-3 text-[25px] sm:text-[35px] drop-shadow-md">
                                {slide.desc}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}