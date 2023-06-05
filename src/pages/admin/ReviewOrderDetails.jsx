import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../component/Loader'
import useFetchCollection from '../../fetchData/useFetchCollection'

const ReviewOrderDetails = () => {

    const {id} = useParams()
    let { data,isLoading } = useFetchCollection("orders")
    const order = {...data.find((item) => id.toLowerCase().includes(item.id.toLowerCase()))}
    const [newOrder, setNewOrder] = useState([])
    const navigate = useNavigate()

  return (
        <>
        {isLoading && <Loader/>}
         <div className='w-3/4 p-10 flex flex-col mx-auto my-10 self-center gap-2'>
            <h1 className='text-3xl font-bold text-gray-600'> Order Details </h1>    
            <a href='/order-history' 
               className='!py-2 ease-in duration-300 cursor-pointer font-medium hover:text-turuncu'> &larr; Back To Orders</a>
            <div className='flex flex-col'>
                <p><span className='font-bold'>Order ID: </span> {id}</p>
                <p><span className='font-bold'>Order Amount: </span> ${{...order}.cartTotal}</p>
                <p><span className='font-bold'>Order Status: </span> {{...order}.orderStatus}</p>
            </div>
            <table className=' my-6 p-6 border-spacing-y-2'>
                  <tr height="50" className='font-bold border-x-0 border-y-4 border-y-mavi'>
                      <td className='w-1/12 h-auto'>No:</td>
                      <td className='w-2/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'></span>Product
                      </td>
                      <td className='w-1/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'> </span> Price 
                      </td>
                      <td className='w-1/12 h-auto'>
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
                        <tr height="175" className='border-b-2 border-b-silver ' key={idx}>
                                <td className='w-1/12 h-auto pl-3'>{idx+1}</td>
                                <td className='w-3/12 h-auto pl-3'>
                                <img src={item.imageURL} alt={item.name} className="w-24 h-24"/>
                                <br/>
                                <p className='font-medium'>{item.name}</p>
                                </td>
                                <td className='w-2/12 h-auto pl-3'>
                                {item.price} ₺
                                </td>
                                <td className='w-2/12 h-auto pl-3'>
                                {item.quantity}
                                </td>
                                <td className='w-2/12 h-auto pl-3'>
                                {item.quantity*item.price} ₺
                                </td>
                                <td className='w-2/12 h-auto pl-3'>
                                <button onClick={() => navigate(`/review-details/${item.id}`)}
                                        className='w-full bg-blue ease-in duration-300 hover:bg-main text-white py-2 my-2 rounded-md'>
                                            Review Product
                                </button> 
                                </td>
                        </tr>
                    ))
                    }
            </table>
            
        </div>  
        </>
   
  )
}

export default ReviewOrderDetails