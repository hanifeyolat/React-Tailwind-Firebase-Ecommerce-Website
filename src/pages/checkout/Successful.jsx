import React from 'react'
import { useNavigate } from 'react-router-dom'

const Successful = () => {

  const navigate=useNavigate()


  return (
    <div className="w-full h-[700px] bg-white rounded-lg py-10 mb-8 flex justify-center ">
        <div className='w-4/5 flex flex-col gap-20'>
            <div className='w-1/3 sm:w-full xs:w-full flex flex-col gap-2'>
            <h1 className='xl:text-3xl lg:text-3xl text-2xl font-bold text-gray-600'>Checkout Succesful </h1>
            <p>Thank you for your purchase...</p>
            <button onClick={() => navigate("/order-history")}
                  className='w-[250px] bg-blue ease-in duration-300 hover:bg-main text-white py-2 my-2 rounded-md'>
              View Order Status
            </button>
            </div>
        </div>
    </div>
  )
}

export default Successful
