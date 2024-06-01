import React from 'react'
import ProfilePic from "../Assets/john-doe-image.png"
import {AiFillStar} from 'react-icons/ai'

const Testimonials = () => {
  return (
    <div className='work-section-wrapper'>
        <div className='work-section-top'>
            <p className='primary-subheading'>Testimonials</p>
            <h1 className='primary-heading'>What folks are saying</h1>
            <p className='primary-text'>
                Just hear from some of our customers 
            </p>
        </div>
        <div className='testimonial-section-bottom'>
            <img src={ProfilePic} alt="testimonial-image" />
            <p>"We just found our new go to ramen spot! Every time a friend is in town we HAVE to take them to Raving Ramen."</p>
            <div className='testimonials-stars-container'>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
            </div>
            <h2>Joey A.</h2>
        </div>
      
    </div>
  )
}

export default Testimonials
