import React from 'react'
import ContactForm from './ContactForm'
import Information from "./Information"

const Contact = () => {



  return (
    <div className="w-full h-auto bg-white rounded-lg py-16 sm:py-8 xs:py-8 mb-8 flex justify-center ">
        <div className='w-4/5 flex flex-col'>
              <h1 className='text-3xl sm:text-2xl xs:text-2xl font-bold text-gray-600 mb-6'>Checkout Succesful </h1>
              <div className='flex gap-5 flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col'>
                  <ContactForm/>
                  <Information/>
              </div>
        </div>
    </div>
  )
}

export default Contact