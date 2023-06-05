import React from 'react'

const Product = ({product}) => {
  return (
    <div className='py-3 px-5 border-[1px] bg-white border-mavi rounded-lg'>
        <p className='font-bold text-lg'>Product: {product.name}</p>
        <p className='font-normal text-sm text-gray'>Quantity: {product.quantity}</p>
        <p className='font-normal text-sm text-gray'>Unit Price: ${product.price}</p>
        <p className='font-semibold text-md text-turuncu '>Total Price: ${product.quantity * product.price}</p>
    </div>
  )
}

export default Product
