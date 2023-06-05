import AdminSidebar from "./AdminSidebar.jsx"
import {AiFillDollarCircle,AiFillShopping} from "react-icons/ai"
import {RiShoppingBag2Fill} from "react-icons/ri"
import useFetchCollection from "../../fetchData/useFetchCollection.jsx"
import OrderStatusChart from "./OrderStatusChart.jsx"
import { useEffect, useState } from "react"
import { HiUserCircle } from "react-icons/hi"


const AdminIndex = () => {

  const products  = useFetchCollection("products").data
  const orders = useFetchCollection("orders").data
  const [earnings, setEarnings] = useState(0)
  const [AdminSideBarOpen, setAdminSideBarOpen] = useState(false)

  useEffect(() => {
    let total=0
    orders.map(item => total+=item.cartTotal)
    setEarnings(total)
  }, [orders])
  
  return (
  
    <div className='w-full h-screen flex xl:bg-[#f8f7f7] lg:bg-[#f8f7f7] bg-white '>
        <AdminSidebar AdminSideBarOpen={AdminSideBarOpen} setAdminSideBarOpen={setAdminSideBarOpen}/>
        <div className='xl:w-3/4 lg:w-3/4 w-4/5 xl:p-10 lg:p-10 py-10 px-0 flex flex-col gap-5  md:mx-auto sm:mx-auto xs:mx-auto'>
              <div className="flex justify-between items-center">
                    <h1 className='xl:text-3xl lg:text-3xl text-2xl font-bold text-gray-600'>Admin Home </h1>
                    <button onClick={() => setAdminSideBarOpen(!AdminSideBarOpen)} className="bg-blue hover:bg-[#000] transition ease-in duration-300 cursor-pointer xl:hidden lg:hidden flex items-center gap-2 text-white px-2 py-1 rounded-lg">
                        <span>Show Admin SideBar</span>
                        <HiUserCircle size={30} className=""/>
                    </button>
              </div>
              <div className='xl:flex lg:flex grid md:grid-cols-2 grid-cols-1 gap-5 w-full '>
                  <div className='xl:w-1/3 lg:w-1/3 w-full flex flex-col p-3 shadow-xl rounded-md border-b-purple border-b-4 bg-white border-[#d2d1d1] border-[1px] z-20'>
                    <h1 className='xl:text-3xl lg:text-3xl text-2xl  font-semibold pb-6'>Earnings</h1>
                    <div className='text-purple font-bold text-3xl flex items-center justify-between gap-2'>
                      <p>${earnings}</p> 
                      <AiFillDollarCircle size={40}/>
                    </div>
                  </div>
                  <div className='xl:w-1/3 lg:w-1/3 w-full flex flex-col p-3 shadow-xl rounded-md border-b-mavi bg-white border-b-4 border-[#d2d1d1] border-[1px] z-20'>
                    <h1 className='xl:text-3xl lg:text-3xl text-2xl  font-semibold pb-6'>Products</h1>
                    <div className='text-mavi font-bold text-3xl flex items-center justify-between gap-2'>
                      <p>{products.length}</p> 
                      <AiFillShopping size={40}/>
                    </div>
                  </div>
                  <div className='xl:w-1/3 lg:w-1/3 w-full flex flex-col p-3 shadow-xl bg-white rounded-md border-b-orange border-b-4 border-[#d2d1d1] border-[1px] z-20'>
                    <h1 className='xl:text-3xl lg:text-3xl text-2xl  font-semibold pb-6'>Orders</h1>
                    <div className='text-orange font-bold text-3xl flex items-center justify-between gap-2'>
                      <p>{orders.length}</p> 
                      <RiShoppingBag2Fill size={40}/>
                    </div>
                  </div>
              
              </div>
              <div  className='flex flex-col xl:w-[500px] lg:w-[500px] md:w-[500px] w-full xl:h-[300px] lg:h-[300px] h-auto p-3 shadow-xl bg-white rounded-md border-b-[#ff6384] border-b-4 border-[#d2d1d1] border-[1px] z-20'>
                  <h1 className='xl:text-3xl lg:text-3xl text-xl font-semibold pb-6'>Order Status Chart</h1>
                  <OrderStatusChart />
              </div>
          <div>

          </div>
        </div>
    </div>

  )
}

export default AdminIndex
