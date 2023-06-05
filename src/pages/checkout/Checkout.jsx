import React from 'react'
import CheckoutSummary from './CheckoutSummary.jsx'
import CheckoutPayCard from './CheckoutPayCard.jsx'
const Checkout = () => {
  return (
    <div className='flex justify-center pt-12 gap-4 w-full'>
      <div className='w-4/5 flex gap-10 my-5 items-start justify-center  '>
          <CheckoutSummary/>
          <CheckoutPayCard/>
      </div>
    </div>
  )
}

export default Checkout
