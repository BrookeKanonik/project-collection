import React from 'react'
import PickMeals from '..Assets/pick-meals=image.png'
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
            text: 'Choose one (or more) of our many selections of Ramen. We highly recommend eating it fresh from our shop, but we won\'t stop you if you want it delivered!'
        },
        {
            image: DeliveryMeals,
            title: "We Deliver",
            text: 'Choose one (or more) of our many selections of Ramen. We highly recommend eating it fresh from our shop, but we won\'t stop you if you want it delivered!'
        },
    ]
  return (
    <div>
      Work
    </div>
  )
}

export default Work
