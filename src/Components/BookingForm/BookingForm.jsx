"use client";
import React, { useState } from "react";
import { useApp } from "../../app/LanguageContext";
import BookingFormUz from "../../../locales/uz/BookingForm.json";
import BookingFormRu from "../../../locales/ru/BookingForm.json";
import BookingFormEn from "../../../locales/en/BookingForm.json";
import axios from "axios";

const BookingForm = () => {
    const { til, darkMode } = useApp();
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber1: "",
        phoneNumber2: "",
        fromCountry: "",
        toCountry: "",
        departureDate: "",
        returnDate: "",
        email: "",
        telegramUsername: "",
    });

    // Get form content based on current language
    const getFormContent = () => {
        switch (til) {
            case "ru":
                return BookingFormRu;
            case "en":
                return BookingFormEn;
            default:
                return BookingFormUz;
        }
    };

    const formContent = getFormContent();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "7147216021:AAGMuN5Lt37qcPAY62u6eccBjVcDKwMK0nE"; // Use env variable
        const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "7317699848"; // Use env variable
        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        try {
            await axios.post(url, {
                chat_id: chatId,
                text: `
${formContent.fullname}: ${formData.fullName}
${formContent.number_1}: ${formData.phoneNumber1}
${formContent.number_2}: ${formData.phoneNumber2}
${formContent.from}: ${formData.fromCountry}
${formContent.to}: ${formData.toCountry}
${formContent.from_when}: ${formData.departureDate}
${formContent.to_when}: ${formData.returnDate}
${formContent.email}: ${formData.email}
${formContent.telegram}: ${formData.telegramUsername}
        `,
            });

            // Reset form on success
            setFormData({
                fullName: "",
                phoneNumber1: "",
                phoneNumber2: "",
                fromCountry: "",
                toCountry: "",
                departureDate: "",
                returnDate: "",
                email: "",
                telegramUsername: "",
            });

            alert(formContent.successMessage || "Message sent successfully!");
        } catch (error) {
            console.error("Error sending message:", error);
            alert(formContent.errorMessage || "Failed to send message. Please try again.");
        }
    };

    return (
        <div
            className={`rounded-xl p-8 shadow-md w-full max-w-7xl my-10 mx-auto ${darkMode ? "dark bg-gray-800" : "bg-white"
                }`}
        >
            <h2
                className={`text-3xl font-bold mb-4 text-center ${darkMode ? "text-white" : "text-gray-800"
                    }`}
            >
                {formContent.BigTitle}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label
                            htmlFor="fullName"
                            className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            {formContent.fullname}
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder={formContent.placeholders.fullName}
                            className={`shadow appearance-none border rounded-[8px] w-full py-2 px-3 leading-tight focus:border-[3px] focus:outline-none focus:shadow-outline focus:border-orange-500 ${darkMode
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                            value={formData.fullName}
                            onChange={handleChange}
                            aria-label={formContent.fullname}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="phoneNumber1"
                            className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            {formContent.number_1}
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber1"
                            placeholder={formContent.placeholders.phone1}
                            className={`shadow appearance-none border rounded-[8px] w-full py-2 px-3 leading-tight focus:border-[3px] focus:outline-none focus:shadow-outline focus:border-orange-500 ${darkMode
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                            value={formData.phoneNumber1}
                            onChange={handleChange}
                            aria-label={formContent.number_1}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="phoneNumber2"
                            className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            {formContent.number_2}
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber2"
                            placeholder={formContent.placeholders.phone2}
                            className={`shadow appearance-none border rounded-[8px] w-full py-2 px-3 leading-tight focus:border-[3px] focus:outline-none focus:shadow-outline focus:border-orange-500 ${darkMode
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                            value={formData.phoneNumber2}
                            onChange={handleChange}
                            aria-label={formContent.number_2}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="fromCountry"
                            className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            {formContent.from}
                        </label>
                        <select
                            id="fromCountry"
                            className={`shadow appearance-none border rounded-[8px] w-full py-2 px-3 leading-tight focus:border-[3px] focus:outline-none focus:shadow-outline focus:border-orange-500 ${darkMode
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                            value={formData.fromCountry}
                            onChange={handleChange}
                            aria-label={formContent.from}
                        >
                            <option value="">{formContent.Selector.default}</option>
                            {Object.entries(formContent.Selector.countries).map(
                                ([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="toCountry"
                            className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            {formContent.to}
                        </label>
                        <select
                            id="toCountry"
                            className={`shadow appearance-none border rounded-[8px] w-full py-2 px-3 leading-tight focus:border-[3px] focus:outline-none focus:shadow-outline focus:border-orange-500 ${darkMode
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                            value={formData.toCountry}
                            onChange={handleChange}
                            aria-label={formContent.to}
                        >
                            <option value="">{formContent.Selector.default}</option>
                            {Object.entries(formContent.Selector.countries).map(
                                ([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="departureDate"
                            className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            {formContent.from_when}
                        </label>
                        <input
                            type="date"
                            id="departureDate"
                            className={`shadow appearance-none border rounded-[8px] w-full py-2 px-3 leading-tight focus:border-[3px] focus:outline-none focus:shadow-outline focus:border-orange-500 ${darkMode
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                            value={formData.departureDate}
                            onChange={handleChange}
                            aria-label={formContent.from_when}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="returnDate"
                            className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            {formContent.to_when}
                        </label>
                        <input
                            type="date"
                            id="returnDate"
                            className={`shadow appearance-none border rounded-[8px] w-full py-2 px-3 leading-tight focus:border-[3px] focus:outline-none focus:shadow-outline focus:border-orange-500 ${darkMode
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                            value={formData.returnDate}
                            onChange={handleChange}
                            aria-label={formContent.to_when}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            {formContent.email}
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder={formContent.placeholders.email}
                            className={`shadow appearance-none border rounded-[8px] w-full py-2 px-3 leading-tight focus:border-[3px] focus:outline-none focus:shadow-outline focus:border-orange-500 ${darkMode
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                            value={formData.email}
                            onChange={handleChange}
                            aria-label={formContent.email}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="telegramUsername"
                            className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            {formContent.telegram}
                        </label>
                        <input
                            type="text"
                            id="telegramUsername"
                            placeholder={formContent.placeholders.telegram}
                            className={`shadow appearance-none border rounded-[8px] w-full py-2 px-3 leading-tight focus:border-[3px] focus:outline-none focus:shadow-outline focus:border-orange-500 ${darkMode
                                ? "bg-gray-700 text-white border-gray-600"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                            value={formData.telegramUsername}
                            onChange={handleChange}
                            aria-label={formContent.telegram}
                        />
                    </div>
                </div>

                <button
                    className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6 w-full ${darkMode
                        ? "bg-orange-600 hover:bg-orange-800 text-white"
                        : "bg-orange-500 hover:bg-orange-700 text-white"
                        }`}
                    type="submit"
                >
                    {formContent.send}
                </button>
            </form>
        </div>
    );
};

export default BookingForm;