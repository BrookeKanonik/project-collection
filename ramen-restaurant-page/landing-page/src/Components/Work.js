import React from 'react'
import PickMeals from '../Assets/pick-meals-image.png'
import ChooseMeals from '../Assets/choose-image.png'
import DeliveryMeals from '../Assets/delivery-image.png'

const Work = () => {
    const workInfoData = [
        {
            image: PickMeals,
            title: "Pick Meals",
            text: 'Choose one (or more) of our many selections of Ramen. We highly recommend eating it fresh from our shop, but we won\'t stop you if you want it delivered!'
        },
        {
            image: ChooseMeals,
            title: "Choose Extras",
            text: 'Maybe you\'re feeling fancy? Why not add an egg and more bamboo shoots. Check which extras you can add on the item page.'
        },
        {
            image: DeliveryMeals,
            title: "Fast Deliveries",
            text: 'If you are within a 3 mile radius, our team will personally deliver to you.'
        },
    ]
  return (
    <div className='work-section-wrapper'>
      <div className='work-section-top'>
        <p className='primary-subheading'>Work</p>
        <h1 className='primary-heading'>How It Works</h1>
      </div>
      <div className='work-section-bottom'>
        {
            workInfoData.map((data) => (
                <div className='work-section-info'>
                    <div className='info-boxes-img-container'>
                        <img src={data.image} alt="" />
                    </div>
                    <h2>{data.title}</h2>
                    <p>{data.text}</p>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Work
