import React from 'react'
import {FaCcVisa} from "react-icons/fa"

const CheckoutPayCard = () => {
  return (
    <div className="border-[1px] bg-white border-[#ebebeb] rounded-lg shadow-lg p-8 mb-8 w-2/5 ">
    <h1 className='text-2xl font-semibold text-gray-600 pb-5'>Stripe Checkout</h1>  
    <form className='flex flex-col my-4 gap-2  w-full'>
        <label className=" font-medium " for="fname"> Card Number </label>
        <div className='flex items-center relative'>
          <input className='w-full py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' max="19" type="tel" name="fname" placeholder="Enter Your Card Number"/>
          <FaCcVisa size={"1.5rem"} className='text-lg absolute top-[5px] right-2 '/>
        </div>
        <div className='flex gap-3'>
            <div className='w-1/2 gap-2 flex flex-col'>
            <label className=" font-medium " for="address-1"> Expiration </label>
            <input className='w-full py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' type="date" name="address-1" placeholder="Enter Your Address 1"/>
            </div>
            <div className='w-1/2  gap-2 flex flex-col'>
            <label className=" font-medium " for="address-1"> CVC</label>
            <input maxlength="3" className='w-full py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' type="tel" name="address-1" placeholder="Enter Your Address 1"/>
            </div>
        </div>
        <label className=" font-medium " for="country"> Postal Code </label>
       
        <select name="country" id="country" className='w-full py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md '>
            <option value="">USA</option>
            <option value="">UK</option>
            <option value="">France</option>
            <option value="">Germany</option>
        </select>
        

        <button className='w-full bg-blue ease-in duration-300 hover:bg-main text-white py-2 my-2 rounded-md'>Pay Now</button>
      </form>
  
    </div>
  )
}

export default CheckoutPayCard
