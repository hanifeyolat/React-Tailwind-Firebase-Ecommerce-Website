import React, { useState } from 'react'
import AdminSidebar from "./AdminSidebar"

const EditProduct = () => {

  const [ AdminSideBarOpen, setAdminSideBarOpen ] = useState(false)

  
  return (
    <div className='w-full flex h-auto bg-[#f8f7f7]'>
        <AdminSidebar AdminSideBarOpen={AdminSideBarOpen} setAdminSideBarOpen={setAdminSideBarOpen} />
        <div className='w-3/4  p-10 flex flex-col gap-5 bg-[#f8f7f7]'>
            <h1 className='text-3xl font-bold text-gray-600'>Edit Product </h1>
            
            <div className="border-[1px]  w-1/2 bg-white border-[#ebebeb] rounded-lg shadow-lg w-full p-8 mb-8  ">
            <h1 className='text-2xl font-semibold text-gray-600'>Shipping Address</h1>   
            <form className='flex flex-col my-4 gap-2'>
              <label className=" font-medium " for="fname"> Product Name: </label>
              <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' type="text" name="product-name" placeholder="Enter Your Product Name"/>

              <label className=" font-medium " for="address-1"> Product Image: </label>
              <input type="file"className='py-1 border-[#a6a6a6] rounded-md ' id="avatar" name="avatar" accept="image/png, image/jpeg"/>
              <span className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] text-[#7f7f7f] rounded-md '>
                  Firebase
              </span>

              <label className=" font-medium " for="address-2">Product Price:</label>
              <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' type="text" name="price" placeholder="Enter Your Product Price "/>

              <label className=" font-medium " for="category"> Product Category: </label>
              <select name="country" id="brands" className='w-1/3 py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md '>
                  <option value="">Laptop</option>
                  <option value="">Television</option>
                  <option value="">Kitchen</option>
                  <option value="">Makeup</option>
              </select>
              
              <label className=" font-medium " for="fname"> Product Company/Brand: </label>
              <input className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' type="text" name="state" placeholder="Enter Your Product Company/Brand"/>

              <label className=" font-medium " for="postalCode"> Product Description: </label>
              <textarea className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' type="text" name="postalCode" placeholder="Enter Your Product Description"/>
              <button className='bg-mavi text-white rounded-xl py-1 px-5 mt-3 hover:bg-main ease-out duration-300 flex content-center !text-center w-1/3'>Edit Product </button>
            </form>
            </div>
        </div>     
    </div>
  )
}

export default EditProduct
