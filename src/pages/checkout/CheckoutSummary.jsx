import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StoreCartProducts, StoreCartTotal } from '../../redux/slices/CartSlice'
import Product from '../checkout/Product'

const CheckoutSummary = () => {
  const cartItems=useSelector(StoreCartProducts)
  const total=useSelector(StoreCartTotal)
  const [ itemsLength , setItemsLength] = useState(0)

  useEffect(()=> {
    setItemsLength(0)
    cartItems.map(p =>   setItemsLength((itemsLength) => itemsLength=itemsLength + p.quantity))
   
  },[cartItems])

  return (
    <div className="border-[1px] bg-white border-[#ebebeb] rounded-lg shadow-lg p-8 mb-8 w-2/5 sm:w-full xs:w-full ">
        <h1 className='text-2xl font-semibold text-gray-600 pb-5'>Checkout Summary</h1>  
        <p className='text-md font-normal'>Cart Item(s): {itemsLength}</p>
        <div className='product-container mt-5 flex flex-col gap-3'>
           { cartItems.map(product => <Product product={product}/>) }
        </div>
        <div className='flex font-medium justify-between text-2xl pt-5'>
            <p>Subtotal: </p>
            <p className='text-turuncu'>${total} </p>
        </div>
    </div>
  )
}

export default CheckoutSummary
