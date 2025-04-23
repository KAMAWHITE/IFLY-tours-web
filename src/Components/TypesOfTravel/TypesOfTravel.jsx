"use client";
import { useApp } from "../../app/LanguageContext";
import TypesOfTravelUz from "../../../locales/uz/TypesOfTravel.json";
import TypesOfTravelRu from "../../../locales/ru/TypesOfTravel.json";
import TypesOfTravelEn from "../../../locales/en/TypesOfTravel.json";

const TypesOfTravel = () => {
    const { til, darkMode } = useApp();

    const getTravelData = () => {
        try {
            switch (til) {
                case "ru":
                    return TypesOfTravelRu?.items || [];
                case "en":
                    return TypesOfTravelEn?.items || [];
                default:
                    return TypesOfTravelUz?.items || [];
            }
        } catch (error) {
            console.error("JSON ma'lumotlarini o'qishda xato:", error);
            return [];
        }
    };

    const travelItems = getTravelData();

    if (!travelItems || travelItems.length === 0) {
        return (
            <div className="w-full mx-auto py-10 text-center">
                <p>{til === "ru"
                    ? "Данные загружаются..."
                    : til === "en"
                        ? "Data is loading..."
                        : "Ma'lumotlar yuklanmoqda..."}</p>
            </div>
        );
    }

    return (
        <div className={`w-full mx-auto ${darkMode ? "dark" : ""}`}>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 mx-auto lg:gap-5 lg:grid-cols-3 py-10 px-5">
                {travelItems.map((item, index) => (
                    <div
                        key={index}
                        className={`p-5 shadow-2xl rounded-2xl ${darkMode
                            ? "bg-gray-800 border-gray-600 text-white"
                            : "bg-white border-gray-700 text-black"
                            }`}
                    >
                        <h1 className="text-[20px] font-bold">
                            {item.title || "Sarlavha mavjud emas"}
                        </h1>
                        <p
                            className={`text-[15px] font-semibold pt-3 ${darkMode ? "text-gray-300" : "text-[#A1A1AA]"
                                }`}
                        >
                            {item.text || "Tavsif mavjud emas"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TypesOfTravel;