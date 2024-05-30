import React from 'react'
import AboutBackground from '../Assets/about-background.png'
import AboutBackgroundImage from '../Assets/about-background-image.png'
import {BsFillPlayCircleFill} from 'react-icons/bs'

const About = () => {
  return (
    <div className='about-section-container'>
      <div className='about-background'>
        <img src={AboutBackground} alt="Background" />
      </div>
      <div className='about-section-image-container'>
        <img src={AboutBackgroundImage} alt="Background Image" />
      </div>
      <div className='about-section-text-container'>
        <p className='primary-subheading'>About</p>
        <h1 className='primary-heading'>
            Our Chefs Carefully Crafted Our Ramen Selection
        </h1>
        <p className='primary-text'>
          From the traditional ramen to something with a kick, we've carefully crafted our menu to ensure you try everything! Become a Ramen Raver and receive one free ramen dish after your 10th ramen.
        </p>
        <p className='primary-text'>
          To be a member (Ramen Raver) and receive a free ramen after the 10th ramen you purchase, speak to our host to receive a punching card. 
        </p>
        <div className='about-buttons-container'>
          <button className='secondary-button'>Learn More</button>
          <button className='watch-video-button'>< BsFillPlayCircleFill/> Watch Video</button>
        </div>
      </div>
    </div>
  )
}

export default About
