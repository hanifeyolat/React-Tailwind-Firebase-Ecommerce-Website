import React from 'react'
import ShippingAddress from "./ShippingAddress.jsx"
import BillingAddress from "./BillingAddress.jsx"
import CheckoutSummary from "./CheckoutSummary.jsx"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectBillingAddress, selectShippingAddress, selectUser, selectUserID, selectUserName } from '../../redux/slices/UserSlice.js'
import { CLEAR_CART, StoreCartProducts, StoreCartTotal} from '../../redux/slices/CartSlice.js'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../component/Loader.js'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../../firebase/config.js'
import useFetchCollection from '../../fetchData/useFetchCollection.jsx'
import { STORE_ORDERS } from '../../redux/slices/OrderSlice.js'
import { SET_PRODUCTS } from '../../redux/slices/ProductSlice.js'


const CheckoutDetails = () => {

  const navigate=useNavigate()
  const shipping =useSelector(selectShippingAddress)
  const billing =useSelector(selectBillingAddress)
  const user=useSelector(selectUser)
  const userName=useSelector(selectUserName)
  const userID=useSelector(selectUserID)
  const cartItems=useSelector(StoreCartProducts)
  const cartTotal=useSelector(StoreCartTotal)
  const [isLoading, setIsLoading] = useState(false);
  const dispatch=useDispatch()


  const SaveOrder =  () => {
    setIsLoading(true);
    const newOrder={
      userID: userID,
      userName: userName,
      shipping: shipping,
      billing: billing,
      cartItems: cartItems,
      cartTotal: cartTotal,
      createdAt: Timestamp.now().toDate(),
      orderStatus: "Order Delivered"
    }

    try {
      addDoc(collection(db, "orders"), {...newOrder});
      toast.success("Order uploaded successfully.");
      dispatch(CLEAR_CART())
      navigate("/checkout-successfull")
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }

    let { data,isLoading } = useFetchCollection("orders")
    let { data2,isLoading2 } = useFetchCollection("products")
    dispatch(STORE_ORDERS({orders: data}))
    dispatch(SET_PRODUCTS({products: data2}))

    
  }


  return (
   <> 
    {isLoading && <Loader/>}
    <div className='w-full flex flex-col justify-center py-12'>
        <div className='w-4/5 flex flex-col self-center gap-4'>
            <h1 className='text-3xl sm:text-2xl xs:text-2xl font-bold text-gray-600 mb-6 sm:mb-0 xs:mb-0'>
              Checkout Detail</h1>
            <div className='flex xl:flex-row lg:flex-row flex-col items-start gap-10 w-full '>
                <div className='flex flex-col gap-4 xl:w-1/2 lg:w-1/2 w-full'>
                    <ShippingAddress/>
                    <BillingAddress/>
                
                </div>
                <div className='xl:w-1/2 lg:w-1/2 w-full'>
                    <CheckoutSummary/>
                </div>
            </div>

            <button onClick={() =>SaveOrder() } 
                            className='w-2/5 bg-blue ease-in duration-300 hover:bg-main text-white py-2 my-2 rounded-md'>
                              Checkout
                    </button>
        </div>
      </div>
   </>
  )
}

export default CheckoutDetails
