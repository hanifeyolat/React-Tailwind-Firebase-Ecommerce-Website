import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrderProduct = (order , itemNumber) => {

  const time = order.order.createdAt.seconds
  const historyTime = convertDate(time)
  const navigate = useNavigate()

  function convertDate(time) {
      //time should be server timestamp seconds only
      let dateInMillis = time * 1000
      let date = new Date(dateInMillis)
      let myDate = date.toLocaleDateString()
      let myTime = date.toLocaleTimeString()
      myDate = myDate.replaceAll('/', '-')
      return myDate
      // return myDate + " - " + myTime
  }


  return (
  <>
    <tr key={order.id} height="50" 
        className='hover:cursor-pointer font-normal border-b-2 border-b-silver hover:bg-[#fafafa] ease-in duration-300 xl:flex lg:flex items-center hidden'>
            <td className='w-1/12 h-auto'>
              {order.itemNumber+1}
            </td>
            <td className='w-2/12 h-auto pl-3'>
              {historyTime}
            </td>
            <td className='w-4/12 h-auto pl-3'>
              {order.order.id}
            </td>
            <td className='w-1/12 h-auto pl-3'>
                ${order.order.cartTotal}
            </td>
            <td className='w-2/12 h-auto pl-3 text-center'>
                <span className={order.order.orderStatus.toLowerCase() === "order placed" ? "text-turuncu font-bold" :  
                                 order.order.orderStatus.toLowerCase() === "order shipping" ? "text-[#9e0000] font-bold" :  
                                 order.order.orderStatus.toLowerCase() === "order delivered" ? "text-[#259e00] font-bold" : 
                                 "text-[#3f1359] font-bold"  }>
                  {order.order.orderStatus.split(" ")[1]}
                </span>
            </td>
            <td className='w-2/12 h-auto pl-3 float-right'>
                <button onClick={() => navigate(`/update-status/${order.order.id}`)}
                        className='bg-blue ease-in duration-300 hover:bg-main text-white px-2 py-1 rounded-md float-right'>
                         <span className='hidden md:flex sm:flex xs:flex md:text-[14px] float-right'> 
                            Update
                         </span>
                </button>
            </td>       
    </tr>

    <tr key={order.id} height="50" 
        className='hover:cursor-pointer font-normal border-b-2 border-b-silver hover:bg-[#fafafa] ease-in duration-300 w-full xl:hidden lg:hidden flex items-center'>
            <td className='w-1/6 h-auto'>
              {order.itemNumber+1}
            </td>
            <td className='w-3/6 h-auto pl-3'>
              {order.order.id}
            </td>
            <td className='w-2/6 h-auto pl-3 float-right'>
                <button onClick={() => navigate(`/update-status/${order.order.id}`)}
                        className='bg-blue ease-in duration-300 hover:bg-main text-white px-2 py-1 rounded-md float-right'>
                         <span className='hidden sm:flex xs:flex text-[10px] sm:text-[14px] xs:text-[14px]'> Update </span>
                </button>
            </td>       
    </tr>
  
  </>
  )
}

export default OrderProduct