import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SET_BILLING_ADDRESS } from '../../redux/slices/UserSlice'

const BillingAddress = () => {

  const [BillingAddress , setBillingAddress] = useState({})
  const dispatch=useDispatch()

  const handleBilling=(e)=>{
    
    const {name, value}=e.target

    setBillingAddress({...BillingAddress,[name]: value})
    dispatch(SET_BILLING_ADDRESS({BillingAddress}))
    
  }
  return (
    <div className="border-[1px] bg-white border-[#ebebeb] rounded-lg shadow-lg w-full p-8 mb-8 ">
      <h1 className='text-2xl font-semibold text-gray-600'>Billing Address</h1>   
      <form className='flex flex-col my-4 gap-2'>
        <label className=" font-medium " htmlFor="fname"> Recipient Name </label>
        <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
                type="text" 
                name="name" 
                placeholder="Enter Your First Name"
                onChange={handleBilling}
                required
                />

        <label className=" font-medium " htmlFor="address-1"> Address 1 </label>
        <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
                type="text" 
                name="address-1" 
                placeholder="Enter Your Address 1"
                onChange={handleBilling}
                required
                />

        <label className=" font-medium " htmlFor="city"> City </label>
        <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
                type="text" 
                name="city" 
                placeholder="Enter Your City"
                onChange={handleBilling}
                required
                />


        <label className=" font-medium " htmlFor="postalCode"> Postal Code </label>
        <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
                type="text" name="postalCode" 
                placeholder="Enter Your Postal Code"
                onChange={handleBilling}
                required
                />

       <select name="country" 
                id="brands" 
                className='w-44 py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md '
                onChange={handleBilling}
                required>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Turkey">Turkey</option>
        </select>
           
        <label className=" font-medium " htmlFor="phone"> Phone  </label>
        <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
                type="text" 
                name="phone" 
                placeholder="Enter Your Postal Code"
                onChange={handleBilling}
                required
                />


       
      </form>
    </div>
  )
}

export default BillingAddress
