import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../component/Loader'
import useFetchCollection from '../../fetchData/useFetchCollection'
import { STORE_ORDERS } from '../../redux/slices/OrderSlice'
import { selectUserID, selectUserName } from '../../redux/slices/UserSlice'
import OrderProduct from "./OrderProduct"
import { HiUserCircle } from 'react-icons/hi'

const OrderHistory = () => {

  const {data,isLoading } = useFetchCollection("orders")
  const [ AdminSideBarOpen, setAdminSideBarOpen ] = useState(false)
  const dispatch = useDispatch()
  const userID=useSelector(selectUserID)
  const userName=useSelector(selectUserName)
  const [userInput, setUserInput] = useState("")
  let orders=[...data?.filter((item) => item.id.toLowerCase().includes(userInput.toLowerCase()) &&
                                          item.userID.toLowerCase()===userID.toLowerCase() )]
  
  useEffect(() => {
    dispatch(STORE_ORDERS({orders: data}))
  }, [dispatch,data])
  
  useEffect(() => {
    const newArr = orders?.filter((item) => item.id.toLowerCase().includes(userInput.toLowerCase()) &&
                                            item.userID.toLowerCase()===userID.toLowerCase() )
    orders=[...newArr]
  },[userInput])


  

  return (
   <>
    {isLoading && <Loader/>}

    <div className='xl:w-4/5lg:w-4/5 w-4/5 mx-auto xl:p-10 lg:p-10 py-10 px-0 flex flex-col gap-5  ' >
            <div className="flex justify-between items-center w-full">
                    <h1 className='xl:text-3xl lg:text-3xl text-2xl font-bold text-gray-600'>Orders </h1>
                        <button onClick={() => setAdminSideBarOpen(!AdminSideBarOpen)} className="bg-blue hover:bg-[#000] transition ease-in duration-300 cursor-pointer xl:hidden lg:hidden flex items-center gap-2 text-white px-2 py-1 rounded-lg ">
                        <span>Show Admin SideBar</span>
                        <HiUserCircle size={30} className=""/>
                    </button>
                  
              </div>
            <p> Open an order to <span className='font-bold'>Change order status</span></p>
            <input onChange={(e) => setUserInput(e.target.value)}
                  type="text" 
                  className=' bg-white border-[#d2d1d1] border-[1px] w-[350px] py-2 px-4 rounded-md' 
                  placeholder="Search an Order..." 
                  value={userInput}/>
            <table className='mt-6 p-10 border-spacing-y-2 xl:flex lg:flex flex-col hidden bg-white shadow-lg w-ful'>
                <tr height="50" className='font-bold border-x-0 border-y-2 border-y-mavi mt-auto flex gap-2 items-center'>
                    <td className='w-1/12 h-auto pr-3'>No:</td>
                    <td className='w-2/12 h-auto pr-3'>
                      <span className=' h-14 border-l-2 border-l-silver pl-2'></span> Date
                    </td>
                    <td className='w-4/12 h-auto pr-3'>
                      <span className=' h-14 border-l-2 border-l-silver pl-2'> </span> ID
                    </td>
                    <td className='w-1/12 h-auto pr-3 '>
                      <span className=' h-14 border-l-2 border-l-silver pl-2'> </span> Amount
                    </td>
                    <td className='w-2/12 h-auto pr-3 text-center'>
                      <span className=' h-14 border-l-2 border-l-silver pl-2'> </span> Status
                    </td>
                    <td className='w-2/12 h-auto pr-3 '>
                      <span className=' h-14 border-l-2 border-l-silver pl-2'> </span>
                      <span className='text-end float-right'> Action </span>
                    </td>
                </tr>
              {
                  orders.length===0 ?
                  (
                    <tr height="50" className='font-bold border-x-0 border-y-4 border-y-mavi' key={"order-none"}>
                      <td className='w-1/12 h-auto' colSpan={6}> No products found...</td>
                    </tr>
                  ):
                  orders.map((order,index) =>  <OrderProduct order={order} itemNumber={Number(index)} /> )
              } 
            </table>

            <table className='mt-6 p-10 bg-white shadow-lg sm:mt-3 xs:mt-3 border-spacing-y-2 w-full xl:hidden lg:hidden flex flex-col '>
                <tr height="50" className='font-bold border-x-0 border-y-4 border-y-mavi flex items-center'>
                    <td className='w-1/6 h-auto'>No:</td>         
                    <td className='w-3/6 h-auto'>
                      <span className=' h-14 border-l-2 border-l-silver pl-2'> </span>  ID
                    </td>
                    <td className='w-2/6 h-auto'>
                      <span className=' h-14 border-l-2 border-l-silver pl-2'> </span>
                      <span className='float-right'>Action</span> 
                    </td>
                </tr>
                  {
                      orders.length===0 ?
                      (
                        <tr height="50" className='font-bold border-x-0 border-y-4 border-y-mavi' key={"order-none"}>
                          <td className='w-1/12 h-auto' colSpan={6}> No products found...</td>
                        </tr>
                      ):
                      orders.map((order,index) =>  <OrderProduct order={order} itemNumber={Number(index)} /> )
                  } 
            </table>
    </div> 
  </>
  )
}

export default OrderHistory
