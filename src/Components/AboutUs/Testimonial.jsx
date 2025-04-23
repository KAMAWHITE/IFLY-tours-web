"use client";
import React from "react";

const Testimonial = ({ quote, author, darkMode }) => {
    return (
        <div
            className={`rounded-xl p-4 shadow-md ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                }`}
        >
            <p
                className={`italic mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
            >
                "{quote}"
            </p>
            <p
                className={`font-semibold text-right ${darkMode ? "text-gray-200" : "text-gray-600"
                    }`}
            >
                - {author}
            </p>
        </div>
    );
};

export default Testimonial;