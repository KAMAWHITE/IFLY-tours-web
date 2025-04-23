import React from "react";
import Image from "next/image";

const CompanyHistory = ({ logo, title, text, link, darkMode }) => {
    return (
        <div
            className={`rounded-xl p-4 shadow-md grid grid-cols-1 sm:grid-cols-[2fr_5fr] md:grid-cols-[2fr_5fr] lg:grid-cols-[1fr_5fr] items-center justify-items-center sm:justify-items-start ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} // darkMode'ga qarab fon va matn rangi
        >
            <Image
                src={logo}
                alt="Company Logo"
                width={160}
                height={160}
                className="mr-4"
            />
            <div>
                <h3
                    className={`text-[15px] font-bold mb-2 ${darkMode ? "text-orange-400" : "text-[#6366F1]"
                        }`}
                >
                    {title}
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                    {text}
                </p>
                <a
                    href={link}
                    className={`${darkMode
                        ? "text-orange-400 hover:text-orange-600"
                        : "text-[#6366F1] hover:text-blue-700"
                        }`}
                >
                    {link}
                </a>
            </div>
        </div>
    );
};

export default CompanyHistory;