import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SET_SHIPPING_ADDRESS } from '../../redux/slices/UserSlice'


const ShippingAddress = () => {

  const [ShippingAddress , setShippingAddress] = useState({})
  const dispatch=useDispatch()

  const handleShipping=(e)=>{

    const {name, value}=e.target

    setShippingAddress({...ShippingAddress,[name]: value})
    dispatch(SET_SHIPPING_ADDRESS({ShippingAddress}))
    
  }

  return (
    <div className="border-[1px] bg-white border-[#ebebeb] rounded-lg shadow-lg w-full p-8 mb-8  ">
      <h1 className='text-2xl font-semibold text-gray-600'>Shipping Address</h1>   
      <form className='flex flex-col my-4 gap-2'>
        <label className=" font-medium " 
               htmlFor="name"> Recipient Name </label>
        <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
               type="text" 
               name="SName" 
               placeholder="Enter Your First Name"
               onChange={handleShipping}
               required
               />

        <label className=" font-medium " 
               htmlFor="address-1"> Address 1 </label>
        <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
               type="text" 
               name="address-1" 
               placeholder="Enter Your Address 1"
               onChange={handleShipping}
               required
               />


        <label className=" font-medium " 
               htmlFor="city"> City </label>
        <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
               type="text" 
               name="city" 
               placeholder="Enter Your City"
               onChange={handleShipping}
               required
               />

        <label className=" font-medium " 
               htmlFor="postalCode"> Postal Code </label>
        <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
               type="text" 
               name="postalCode" 
               placeholder="Enter Your Postal Code"
               onChange={handleShipping}
               required
               />
               
        <select name="country" id="brands" required
                className='w-44 py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md '
                onChange={handleShipping} >
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Turkey">Turkey</option>
        </select>
        
        <label className=" font-medium " 
               htmlFor="phone"> Phone  </label>
        <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
               type="text" 
               name="phone" 
               placeholder="Enter Your Postal Code" 
               onChange={handleShipping}
               required
               />

      </form>
    </div>
  )
}

export default ShippingAddress
