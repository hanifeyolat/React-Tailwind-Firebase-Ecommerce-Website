import React from 'react'
import {BsFillTelephoneFill,BsTwitter} from "react-icons/bs"
import {AiFillMail} from "react-icons/ai"
import {MdLocationOn} from "react-icons/md"

const Information = () => {
  return (
    <div className="border-[1px] bg-blue text-white border-[#ebebeb] rounded-lg shadow-lg h-auto xl:w-1/2 lg:w-1/2 w-full p-8  flex flex-col gap-4 ">
      <p className='text-xl font-semibold'>Our Contact Information</p>
      <p>Fill the form or contact us via other channels listed blow</p>
      <div className='flex flex-col gap-3'>
        <div className='flex   items-center gap-3'>
          <BsFillTelephoneFill/>
          <p>+90 705 141 8545</p>
        </div>
        <div className='flex justify-start items-center gap-3'>
          <AiFillMail/>
          <p>support@yolattechnology.com</p>
        </div>
        <div className='flex justify-start items-center gap-3'>
          <MdLocationOn className='text-xl'/>
          <p>Sultangazi,İstanbul</p>
        </div>
        <div className='flex justify-start items-center gap-3'>
          <BsTwitter/>
          <p>@hanifeyolat</p>
        </div>
      </div>
    </div>
  )
}

export default Information
