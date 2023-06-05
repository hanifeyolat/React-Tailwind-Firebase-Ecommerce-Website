import React, { useState } from 'react'
import AdminSidebar from "./AdminSidebar"
import OrderHistory from "./OrderHistory"

const Orders = () => {
  
  const [ AdminSideBarOpen, setAdminSideBarOpen ] = useState(false)


  return (
    <div className='w-full h-full flex'>
        <AdminSidebar AdminSideBarOpen={AdminSideBarOpen} setAdminSideBarOpen={setAdminSideBarOpen}/>
        <OrderHistory/>
    </div>
  )
}

export default Orders
