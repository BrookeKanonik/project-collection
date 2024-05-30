import React from 'react'
import Navbar from './Navbar'
import BannerBackground from '../Assets/home-banner-background.png'
import BannerImage from "../Assets/home-banner-image.png"
import {FiArrowRight} from 'react-icons/fi'

const Home = () => {
  return (
    <div className='home-container'> 
      <Navbar/>
      <div className='home-banner-container'>
        <div className='home-bannerImage-container'>
          <img src={BannerBackground} alt="Banner" />
        </div>
        <div className='home-text-section'>
          <h1 className='primary-heading'>
            The Best Ramen You Might Ever Have! See What Our Customers Say!
          </h1>
          <p className='primary-text'>
            Made with the finest of ingredients locally sourced (or specially flown in depending on the season!), Raving Ramen is something to truly rave about.
          </p>
          <button className='secondary-button'>
            Order Now <FiArrowRight/>
          </button>
        </div>
        <div className='home-image-container'>
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home
