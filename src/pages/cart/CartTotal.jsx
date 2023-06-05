import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SET_PREVIOUS_URL, selectUserIsLoggedIn } from '../../redux/slices/UserSlice'
import { StoreCartProducts } from '../../redux/slices/CartSlice'


const CartTotal = () => {
  const ReduxCartProducts = useSelector(StoreCartProducts)
  const [cartItemsLength,setCartItemsLength] = useState(0)
  const [cartTotal,setTotal] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(()=>{
    let key=0
    let price=0
    ReduxCartProducts.map(item => {
      key=key+item.quantity
      price=price + item.quantity*item.price
    })
    setCartItemsLength(key)
    setTotal(price)
  },[ReduxCartProducts])

  const IsLoggedIn = useSelector(selectUserIsLoggedIn)

  const handleCheckout = (e) => {
    dispatch(SET_PREVIOUS_URL({path: location.pathname}))
    IsLoggedIn ? navigate("/checkout-details") : navigate("/login")
  }

  return (
    <div className='xl:w-[400px] lg:w-[400px] md:w-[400px] w-full mt-5 flex flex-col self-end'>
      <Link to='/' className='!py-2 ease-in duration-300 cursor-pointer font-medium hover:text-turuncu'> &larr; Continue Shopping</Link>
      <div className='w-full p-8 bg-white shadow-lg flex flex-col gap-3'>
          <p className='text-md font-semibold self-end'>Cart Item(s): {cartItemsLength}</p>
          <span className='w-full border-t-[1px] border-t-[#eee] mb-2'></span>
          <div className='flex flex-col gap-1'>
          <div className='flex justify-between '>
                      <p className='text-md font-semibold'> Ürün</p>
                      <p className='text-md font-semibold'> Fiyat x Adet</p>
                  </div>
              {
                ReduxCartProducts.length === 0 ? <p>There is no something tu buy...</p> :
                ReduxCartProducts.map(product => (
                  <div className='flex justify-between'>
                      <p className='text-md font-normal'> {product.name}</p>
                      <p className='text-md font-normal'> ${product.price} x {product.quantity}</p>
                  </div>
                ))
              }
          </div>
          <span className='w-full border-t-[1px] border-t-[#eee] mt-2'></span>
          <div className='flex font-medium justify-between text-md'>
              <p>Subtotal: </p>
              <p className='text-turuncu'>${cartTotal} </p>
          </div>
          <p className='w-full text-xs font-normal text-black-100'>Tax an shipping calculated at checkout</p>
          <button onClick={handleCheckout} className='w-full bg-blue ease-in duration-300 hover:bg-main text-white py-2 my-2 rounded-md'>Checkout</button>
      </div> 
    </div>
  )
}

export default CartTotal
