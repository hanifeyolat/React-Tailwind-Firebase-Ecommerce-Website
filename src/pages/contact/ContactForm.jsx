import React from 'react'

const ContactForm = () => {
  return (
    <div className="border-[1px] bg-white border-[#ebebeb] rounded-lg shadow-lg h-auto xl:w-1/2 lg:w-1/2 w-full px-8 ">
    <form className='flex flex-col my-4 gap-2'>
      <label className=" font-medium " for="name">Name </label>
      <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' type="text" name="name" placeholder="Enter Your Name"/>

      <label className=" font-medium " for="email"> Email </label>
      <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' type="email" name="email" placeholder="Enter Your E-mail"/>

      <label className=" font-medium " for="address-2"> Subject </label>
      <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' type="text" name="subject" placeholder="Enter Subject"/>

      <label className=" font-medium " for="message"> Message </label>
      <textarea className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' type="textarea" name="message" placeholder="Enter Your Message"/>

      <button className='w-full bg-blue ease-in duration-300 hover:bg-main text-white py-2 my-2 rounded-md'>Send Message</button>
    </form>
  </div>
  )
}

export default ContactForm
