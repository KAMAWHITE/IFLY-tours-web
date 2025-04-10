import AboutUs from '@/Components/AboutUs/AboutUs'
import BookingForm from '@/Components/BookingForm/BookingForm'
import CountryInfo from '@/Components/CountryInfo/CountryInfo'
import Footer from '@/Components/Footer/Footer'
import PremiumTours from '@/Components/PremiumTours/PremiumTours'
import SwiperCarousel from '@/Components/SwiperCarousel/SwiperCarousel'
import TypesOfTravel from '@/Components/TypesOfTravel/TypesOfTravel'
import React from 'react'

const page = () => {
  return (
    <div>
      <SwiperCarousel />
      <TypesOfTravel />
      <PremiumTours />
      <CountryInfo />
      <AboutUs />
      <BookingForm />
      <Footer />
    </div>
  )
}

export default page