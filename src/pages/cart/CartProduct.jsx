import React from 'react'
import { FaTrash } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { DECREASE_CART_QUANTITY, 
         INCREASE_CART_QUANTITY,
         REMOVE_FROM_CART } from '../../redux/slices/CartSlice'

const CartProduct = ({product,idx}) => {

  const dispatch=useDispatch()

  return (
        <> 
            <tr height="200" key={product.id+Math.random()} 
                className='font-normal border-x-0 border-b-2 border-b-silver py-5 xl:flex lg:flex md:flex hidden items-center '>
                <td className='w-1/12 h-auto pl-3'> {idx+1} </td>
                <td className='w-2/12 h-auto pl-3 gap-2'> 
                    <img src={product.imageURL} alt={product.name} className="w-24" />
                </td>
                <td className='w-4/12 h-auto pl-3'>
                    <span className='font-bold py-4'>{product.name}</span> 
                    <br/>
                    <span className='font-bold py-4'>${product.price}</span>  
                </td>
                <td className='w-3/12 h-auto pl-3 '>
                    <div className='flex gap-2 items-center '>
                        <button onClick={() => dispatch(INCREASE_CART_QUANTITY({product}))} className='w-7 h-7 bg-[#eee] hover:bg-[#dddddd] transition ease-in duration-100 flex items-center justify-center rounded-sm'> + </button>
                        <span>{product.quantity}</span>
                        <button onClick={() => dispatch(DECREASE_CART_QUANTITY({product}))} className='w-7 h-7 bg-[#eee] hover:bg-[#dddddd] transition ease-in duration-100  flex items-center justify-center rounded-sm'> - </button>
                    </div>
                </td>
                <td className='w-1/12 h-auto pl-3 text-turuncu font-bold'> ${product.price*product.quantity}</td>
                <td className='w-1/12 h-auto pl-3 text-danger cursor-pointer' > 
                    <button className='w-1/12 h-auto pl-3 text-danger ' onClick={() => dispatch(REMOVE_FROM_CART({product}))} > 
                          <FaTrash size={17}/>
                    </button>
                </td>
            </tr>
            <tr height="200" key={product.id+Math.random()} 
                className='font-normal border-x-0 border-b-2 border-b-silver py-5 xl:hidden lg:hidden md:hidden flex items-center' >
                <td height="200" className='w-1/12 h-[200px] flex items-center pl-3'> {idx+1} </td>
                <td height="200" className='w-5/12 h-[200px] flex items-center pl-3 gap-2'> 
                    <img src={product.imageURL} alt={product.name} className="w-16" />
                </td>
                <td height="200" className='w-6/12 py-8 h-[200px] flex flex-col justify-between' >
                    <span className='font-bold'>
                        {product.name}
                        <br/>
                        (${product.price})
                        </span>  
                        <div className='flex gap-2 items-center'>
                        <button onClick={() => dispatch(INCREASE_CART_QUANTITY({product}))} className='w-6 h-6 bg-[#eee] hover:bg-[#dddddd] transition ease-in duration-100 flex items-center justify-center rounded-sm'> + </button>
                        <span>{product.quantity}</span>
                        <button onClick={() => dispatch(DECREASE_CART_QUANTITY({product}))} className='w-6 h-6 bg-[#eee] hover:bg-[#dddddd] transition ease-in duration-100  flex items-center justify-center rounded-sm'> - </button>
                    </div>
                    <div className='flex gap-4' >
                        <span className='font-bold text-turuncu'>${product.price*product.quantity}</span>  
                        <button className='w-1/12 h-auto pl-3 text-danger ' onClick={() => dispatch(REMOVE_FROM_CART({product}))} > 
                            <FaTrash size={17}/>
                        </button>
                    </div>
                </td>
            </tr>
        </>
  )
}

export default CartProduct
