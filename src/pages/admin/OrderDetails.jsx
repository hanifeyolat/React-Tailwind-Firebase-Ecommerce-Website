import { async } from '@firebase/util'
import { deleteDoc, doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetchCollection from '../../fetchData/useFetchCollection'
import { db } from '../../firebase/config'
import AdminSidebar from "./AdminSidebar"
import { HiUserCircle } from 'react-icons/hi'

const OrderDetails = () => {
  
  const {id} = useParams()
  const navigate = useNavigate()
  let { data, isLoading } = useFetchCollection("orders")
  const order = {...data.find((item) => id.toLowerCase().includes(item.id.toLowerCase()))}
  const [OrderStatus,setOrderStatus] = useState("Delivered")
  const [ AdminSideBarOpen, setAdminSideBarOpen ] = useState(false)
   

  const UpdateOrder = (e) => {
    e.preventDefault()
    
    const newOrder = {
      billing: order?.billing,
      cartItems:order?.cartItems,
      cartTotal:order?.cartTotal,
      createdAt:order?.createdAt,
      editedAt:Timestamp.now(),
      id: order?.id,
      orderStatus: `Order ${OrderStatus}`,
      shipping: order?.shipping,
      userID:order?.userID,
      userName:order?.userName
    }
    deleteDoc(doc(db, "orders", order.id))
    setDoc(doc(db, "orders", id) , {...newOrder})
    navigate("/admin/orders")
  }


  return (
    <div className='w-full flex h-full bg-[#f8f7f7]'>
        <AdminSidebar AdminSideBarOpen={AdminSideBarOpen} setAdminSideBarOpen={setAdminSideBarOpen} />
        <div className='xl:w-4/5 lg:w-4/5 w-4/5 mx-auto xl:p-10 lg:p-10 md:px-0 md:py-10 sm:px-0 sm:py-10 xs:px-0 xs:py-10 flex flex-col gap-4 '>
  
            <div className="flex justify-between items-center w-full">
                    <h1 className='xl:text-3xl lg:text-3xl text-2xl font-bold text-gray-600'>Order Details </h1>
                        <button onClick={() => setAdminSideBarOpen(!AdminSideBarOpen)} className="bg-blue hover:bg-[#000] transition ease-in duration-300 cursor-pointer xl:hidden lg:hidden flex items-center gap-2 text-white px-2 py-1 rounded-lg ">
                        <span>Show Admin SideBar</span>
                        <HiUserCircle size={30} className=""/>
                    </button>
                  
              </div>
            
            <Link to='/home' className='!py-2 ease-in duration-300 cursor-pointer font-medium hover:text-turuncu'>
                 &larr; Back To Orders
            </Link>

            <div className='flex flex-col'>
                <p><span className='font-bold'>Order ID: </span> {id}</p>
                <p><span className='font-bold'>Order Amount: </span> ${{...order}.cartTotal}</p>
                <p><span className='font-bold'>Order Status: </span> {{...order}.orderStatus}</p>
            </div>

            {/* ----- MASAÜSTÜ ----- */}
            <table className='xl:flex lg:flex hidden flex-col mt-6 p-10 border-spacing-y-2 bg-white shadow-lg '>
                  <tr height="50" className='py-6 font-bold border-x-0 border-y-2 border-y-mavi flex items-center'>
                      <td className='w-1/12 h-auto'>No:</td>
                      <td className='w-4/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'></span>Product
                      </td>
                      <td className='w-2/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'> </span> Price 
                      </td>
                      <td className='w-2/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'> </span> Quantity
                      </td>
                      <td className='w-1/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'> </span> Total 
                      </td>
                      <td className='w-2/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'> </span> Action 
                      </td>
                  </tr>
                {
                    order?.cartItems?.map((item,idx) => (
                        <tr height="175" className='border-b-2 border-b-silver flex items-center ' key={idx}>
                                <td className='w-1/12 h-auto pl-3'>{idx+1}</td>
                                <td className='w-4/12 h-auto pl-3'>
                                    <img src={item.imageURL} alt={item.name} className="w-24 h-24"/>
                                    <br/>
                                    <p className='font-medium'>{item.name}</p>
                                </td>
                                <td className='w-2/12 h-auto'>
                                   <p>{item.price} ₺</p>
                                </td>
                                <td className='w-2/12 h-auto'>
                                    <p>{item.quantity}</p>
                                </td>
                                <td className='w-1/12 h-auto'>
                                   <p>{item.quantity*item.price} ₺</p>
                                </td>
                                <td className='w-2/12 h-auto'>
                                    <button onClick={() => navigate(`/review-details/${item.id}`)}
                                            className='w-full bg-blue ease-in duration-300 hover:bg-main text-white py-2 my-2 rounded-md'>
                                                Review Product
                                    </button> 
                                </td>
                        </tr>
                    ))
                    }
            </table>
            
            {/* ----- MOBİL ----- */}
            <table className='xl:hidden lg:hidden flex flex-col gap-5 mt-6 p-10 border-spacing-y-2 bg-white shadow-lg '>
                  <tr height="50" className='py-6 font-bold border-x-0 border-y-2 border-y-mavi flex items-center'>
                      <td className='w-1/12 h-auto'>No:</td>
                      <td className='w-7/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'></span>Product
                      </td>
                
                      <td className='w-4/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'> </span> Action 
                      </td>
                  </tr>
                {
                    order?.cartItems?.map((item,idx) => (
                        <tr height="220" className='border-b-2 border-b-silver flex items-center h-full py-5 ' key={idx}>
                                <td className='w-1/12 h-auto pl-3'>{idx+1}</td>
                                <td className='w-7/12 h-auto pl-3'>
                                    <div className=' w-24 h-24 bg-red-200'>
                                        <img src={item.imageURL} alt={item.name} 
                                             className="w-full h-full object-contain "/>
                                    </div>
                                    <p className='font-medium'>{item.name}</p>
                                    <p className='font-medium'>${item.price} x {item.quantity}</p>
                                    <p className='text-turuncu font-bold text-lg'>${item.price * item.quantity}</p>      
                                </td>
                                <td className='w-4/12 h-auto'>
                                    <button onClick={() => navigate(`/review-details/${item.id}`)}
                                            className='w-full bg-blue ease-in duration-300 hover:bg-main text-white py-2 my-2 rounded-md'>
                                                Review
                                    </button> 
                                </td>
                        </tr>
                    ))
                    }
            </table>
            
            <div className='xl:w-[300px] lg:w-[300px] md:w-[300px] sm:w-[300px] w-full border-2 border-mavi p-4 mt-6 rounded-lg shadow-lg flex flex-col gap-4'>
                <form onSubmit={(e) => UpdateOrder(e)} className='w-full py-1 px-4 bg-[#f6f6f6] rounded-md flex flex-col  gap-4'>
                      <h1 className='text-xl font-bold text-gray-600 py-1'>Update Status</h1>
                      <select value={OrderStatus} onChange={(e)=> setOrderStatus(e.target.value)} name="country" id="brands" className=' w-full py-1 px-4 border-[1px] bg-[#f6f6f6] rounded-md' >
                          <option value="Delivered">Delivered</option>
                          <option value="Shipping">Shipping</option>
                          <option value="Ordered">Ordered</option>
                          <option value="Placed">Placed</option>
                      </select>
                      <button type="submit" className='w-[150px] bg-mavi text-white rounded-xl py-1 px-4 hover:bg-main ease-out duration-300 !text-center flex items-center justify-center self-center'>
                          Update Status
                      </button>
                </form>
            </div>

        </div>     
    </div>
  )
}

export default OrderDetails
