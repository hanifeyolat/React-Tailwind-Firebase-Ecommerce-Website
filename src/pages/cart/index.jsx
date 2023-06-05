import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_CART, REMOVE_FROM_CART, StoreCartProducts } from '../../redux/slices/CartSlice'
import CartProduct from "./CartProduct"
import CartTotal from './CartTotal'

const Cart = () => {

  const ReduxCartProducts = useSelector(StoreCartProducts)
  const dispatch =useDispatch()
  const [products, setProducts] = useState(ReduxCartProducts)
  console.log("ReduxCartProducts: ", ReduxCartProducts)

  useEffect(()=>{
    setProducts(ReduxCartProducts)
    console.log("products: ", products)
    console.log("ReduxCartProducts: ", ReduxCartProducts)
  },[ReduxCartProducts])


  return (
    <div className='h-3/4 w-full flex justify-center items-center py-10 relative'>
        <div className='w-4/5 flex flex-col self-center gap-3 '>

              <h1 className='text-3xl sm:text-2xl xs:text-2xl font-bold text-gray-600 mb-6'>Shopping Cart</h1>

              <table className=' mt-6 border-spacing-y-2 xl:flex lg:flex md:flex flex-col hidden'>
                    <tr height="50" className='font-bold border-x-0 border-y-4 border-y-mavi w-full flex items-center'>
                      <td className='w-1/12 h-auto'>No:</td>
                      <td className='w-2/12 h-auto'><span className='border-l-2 border-l-silver pl-2'></span> Product </td>
                      <td className='w-4/12 h-auto'><span className='border-l-2 border-l-silver pl-2'> </span> Price </td>
                      <td className='w-3/12 h-auto'><span className='border-l-2 border-l-silver pl-2'> </span> Quantity </td>
                      <td className='w-1/12 h-auto'><span className='border-l-2 border-l-silver pl-2'> </span> Total </td>
                      <td className='w-1/12 h-auto'><span className='border-l-2 border-l-silver pl-2'> </span> Action</td>
                    </tr>
                    {
                      ReduxCartProducts.length === 0 ?
                      <tr height="200" className='text-xl text-[#b0b0b0] w-full'>
                        <td colSpan={6}>Please add something to buy...</td>
                      </tr> :
                      ReduxCartProducts.map((item,idx) => <CartProduct product={item} idx={idx} />)
                    }
              </table>

              <table className='w-full border-spacing-y-2 xl:hidden lg:hidden md:hidden flex flex-col '>
                    <tr height="50"className='font-bold border-x-0 border-y-4 border-y-mavi flex gap-2 my-auto flex items-center '>
                      <td className='w-1/12'>No:</td>
                      <td className='w-4/12'><span className='w-1 h-14 border-l-2 border-l-silver pl-3'></span> Product </td>
                      <td className='w-7/12'><span className='w-1 h-14 border-l-2 border-l-silver pl-3'> </span> Details </td>
                    </tr>
                    {
                      ReduxCartProducts.length===0 ?
                          <tr height="200" className='text-xl text-[#b0b0b0] w-full'>
                              <td colSpan={6}>Please add something to buy...</td>
                          </tr> : ReduxCartProducts.map((item,idx)=>   <CartProduct product={item} idx={idx} />)
                    }
              </table> 

              <button onClick={() => dispatch(CLEAR_CART())} 
                      className='w-[200px] bg-turuncu text-white text-center font-semibold rounded-xl py-2 px-9 mt-6 hover:bg-main ease-out duration-300 '  >
                     Clear Cart 
              </button>
              <CartTotal/>
        </div>
    </div>
  )
}

export default Cart