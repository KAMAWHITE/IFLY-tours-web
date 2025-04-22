import AboutUs from "@/Components/AboutUs/AboutUs";
import BookingForm from "@/Components/BookingForm/BookingForm";
import CountryInfo from "@/Components/CountryInfo/CountryInfo";
import Footer from "@/Components/Footer/Footer";
import PremiumTours from "@/Components/PremiumTours/PremiumTours";
import SwiperCarousel from "@/Components/SwiperCarousel/SwiperCarousel";
import TypesOfTravel from "@/Components/TypesOfTravel/TypesOfTravel";
import React from "react";

const Page = () => {
  return (
    <div>
      <SwiperCarousel />
      <TypesOfTravel />
      <div id="tours">
        <PremiumTours />
      </div>
      <div id="visa">
        <CountryInfo />
      </div>
      <div id="about">
        <AboutUs />
      </div>
      <div id="contact">
        <BookingForm />
      </div>
      <Footer />
    </div>
  );
};

export default Page;