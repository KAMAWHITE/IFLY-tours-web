"use client";
import React from "react";
import FeatureCard from "./FeatureCard";
import CompanyHistory from "./CompanyHistory";
import Testimonial from "./Testimonial";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import { useApp } from "../../app/LanguageContext"; // useApp hookini import qilamiz
import AboutUsUz from "../../../locales/uz/AboutUs.json";
import AboutUsRu from "../../../locales/ru/AboutUs.json";
import AboutUsEn from "../../../locales/en/AboutUs.json";
import CompanyHistoryUz from "../../../locales/uz/CompanyHistory.json";
import CompanyHistoryRu from "../../../locales/ru/CompanyHistory.json";
import CompanyHistoryEn from "../../../locales/en/CompanyHistory.json";
import FeatureCardUz from "../../../locales/uz/FeaturedCard.json";
import FeatureCardRu from "../../../locales/ru/FeaturedCard.json";
import FeatureCardEn from "../../../locales/en/FeaturedCard.json";
import TestimonialUz from "../../../locales/uz/Testimonials.json";
import TestimonialRu from "../../../locales/ru/Testimonials.json";
import TestimonialEn from "../../../locales/en/Testimonials.json";

const AboutUs = () => {
    const { til, darkMode } = useApp(); // til va darkMode'ni olish

    React.useEffect(() => {
        AOS.init({
            easing: "ease-out-cubic",
            once: true,
            offset: 50,
        });
    }, []);

    // Get content based on current language
    const getContent = (contentType) => {
        try {
            switch (til) {
                case "ru":
                    return {
                        aboutUs: AboutUsRu,
                        companyHistory: CompanyHistoryRu,
                        featureCard: FeatureCardRu.features,
                        testimonial: TestimonialRu.testimonials,
                    }[contentType];
                case "en":
                    return {
                        aboutUs: AboutUsEn,
                        companyHistory: CompanyHistoryEn,
                        featureCard: FeatureCardEn.features,
                        testimonial: TestimonialEn.testimonials,
                    }[contentType];
                default:
                    return {
                        aboutUs: AboutUsUz,
                        companyHistory: CompanyHistoryUz,
                        featureCard: FeatureCardUz.features,
                        testimonial: TestimonialUz.testimonials,
                    }[contentType];
            }
        } catch (error) {
            console.error(`Error loading ${contentType} data:`, error);
            return contentType === "featureCard" || contentType === "testimonial" ? [] : {};
        }
    };

    const aboutUsContent = getContent("aboutUs");
    const featureCards = getContent("featureCard");
    const companyHistory = getContent("companyHistory");
    const testimonials = getContent("testimonial");

    return (
        <div
            className={`py-12 ${darkMode ? "dark bg-gray-800" : "bg-orange-500"}`} // darkMode'ga qarab fon
        >
            <div className="container mx-auto px-4">
                <section className="mb-8 text-center">
                    <h2
                        data-aos="fade-up"
                        className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-white"
                            }`} // darkMode'da matn oq bo'lib qoladi
                    >
                        {aboutUsContent?.title || "Biz haqimizda"}
                    </h2>
                    <p
                        data-aos="fade-up"
                        className={darkMode ? "text-gray-300" : "text-white"} // darkMode'ga qarab matn rangi
                    >
                        {aboutUsContent?.text || ""}
                    </p>
                </section>

                <section className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {featureCards?.map((feature, index) => (
                            <div
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                key={index}
                            >
                                <FeatureCard
                                    icon={feature.icon}
                                    title={feature.title}
                                    description={feature.description}
                                    iconColor={
                                        darkMode
                                            ? "text-orange-400"
                                            : feature.iconColor || "text-orange-500"
                                    } // darkMode'ga qarab ikonka rangi
                                    darkMode={darkMode} // darkMode'ni props sifatida uzatamiz
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <div data-aos="fade-up" data-aos-duration="1500">
                        <CompanyHistory
                            logo="/logo.png"
                            title={companyHistory?.title || ""}
                            text={companyHistory?.text || ""}
                            link={companyHistory?.link || "#"}
                            darkMode={darkMode} // darkMode'ni props sifatida uzatamiz
                        />
                    </div>
                </section>

                <section data-aos="fade-up" data-aos-duration="1500">
                    <h2
                        className={`text-2xl font-bold mb-10 text-center ${darkMode ? "text-white" : "text-white"
                            }`} // darkMode'da matn oq bo'lib qoladi
                    >
                        {aboutUsContent?.topswiper || "Mijozlarimiz fikrlari"}
                    </h2>
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={3}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {testimonials?.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <Testimonial
                                    quote={testimonial.quote}
                                    author={testimonial.author}
                                    darkMode={darkMode} // darkMode'ni props sifatida uzatamiz
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;