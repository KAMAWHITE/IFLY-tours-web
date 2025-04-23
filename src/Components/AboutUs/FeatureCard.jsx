"use client";
import React from "react";
import { CgAirplane } from "react-icons/cg";
import { FaHotel } from "react-icons/fa";
import { GiDirectionSigns } from "react-icons/gi";
import { MdPeopleAlt } from "react-icons/md";

const iconComponents = {
    airplane: CgAirplane,
    hotel: FaHotel,
    directions: GiDirectionSigns,
    people: MdPeopleAlt,
};

const FeatureCard = ({ icon, title, description, iconColor, darkMode }) => {
    const IconComponent = iconComponents[icon];

    return (
        <div
            className={`rounded-xl p-6 shadow-md flex flex-col items-center text-center h-full ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
        >
            {IconComponent && (
                <div className={`${iconColor} text-4xl mb-4`}>
                    <IconComponent />
                </div>
            )}
            <h3
                className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"
                    }`}
            >
                {title}
            </h3>
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                {description}
            </p>
        </div>
    );
};

export default FeatureCard;