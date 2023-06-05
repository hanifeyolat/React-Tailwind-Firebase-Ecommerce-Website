import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import {FaTrash,FaEdit} from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import useFetchCollection from '../../fetchData/useFetchCollection'
import { db } from '../../firebase/config'
import { SET_PRODUCTS } from '../../redux/slices/ProductSlice'


const Product = ({product,no}) => {


  const dispatch = useDispatch()
  const navigate=useNavigate()
  const { data , isLoading } = useFetchCollection("products")

  const RemoveProduct = async (product)=>{
      toast.error("Product deleted.")
      await deleteDoc(doc(db, "products", product.id));
  }

  const EditProduct = (product)=>{
   // localStorage.setItem("editProduct",JSON.stringify(product))
    navigate(`/admin/add-products/${product.id}`)
  }

 
  return (
        <>
          {<ToastContainer/>}
          <tr key={product.id} height="200" className='xl:flex lg:flex hidden items-center font-normal border-x-0 border-b-2 transition ease-in duration-300 border-b-silver hover:bg-[#fafafa] cursor-pointer'>
            <td className='w-1/12 h-auto pl-3 font-bold'> {no+1} </td>
            <td className='w-2/12 h-auto pl-3'> 
                {/* <span className='font-bold py-4'>Product Img</span>   */}
                <div className='w-28 h-28 object-contain overflow-hidden'>
                    <img src={product.imageURL} alt="Product" className='w-full h-auto' />
                </div>
            </td>
            <td className='w-4/12 h-auto pl-3 font-bold'> {product.name}</td>
            <td className='w-2/12 h-auto pl-3'> 
            {product.category}      
            </td>
            <td className='w-2/12 h-auto pl-3  text-turuncu font-bold'> {`$ ${product.price}`} </td>
            <td className='w-2/12 h-auto pl-3 flex !items-center justify-center'> 
              <div className='inline-flex gap-2 h-[250px] !my-auto'>
                 <button className=' text-danger text-xl' onClick={() => RemoveProduct(product)} ><FaTrash/></button>
                 <button className='text-success text-2xl' onClick={() => EditProduct(product)}  ><FaEdit/></button>
              </div>
            </td>
        </tr>

        <tr key={product.id} height="200" className='xl:hidden lg:hidden flex items-center font-normal border-x-0 border-b-2 transition ease-in duration-300 border-b-silver hover:bg-[#fafafa] cursor-pointer'>
            <td className='w-1/6 h-auto pl-3 font-bold'> {no+1} </td>
            <td className='w-4/6 h-auto pl-3 flex flex-col gap-1'> 
                {/* <span className='font-bold py-4'>Product Img</span>   */}
                <div className='w-28 h-28 object-contain overflow-hidden rounded-md p-4 bg-white'>
                    <img src={product.imageURL} alt="Product" className='w-full h-auto' />
                </div>
                <p className='font-bold w-auto'>{product.name}</p>
                <p className='font-bold w-auto text-turuncu'>{`$ ${product.price}`}</p>

            </td>
            <td className='w-1/6 h-auto pl-3 flex !items-center justify-center'> 
              <div className='inline-flex gap-2 h-[250px] !my-auto'>
                 <button className=' text-danger text-xl' onClick={() => RemoveProduct(product)} ><FaTrash/></button>
                 <button className='text-success text-2xl' onClick={() => EditProduct(product)}  ><FaEdit/></button>
              </div>
            </td>
        </tr>

      <div className='hidden flex-col items-center justify-center gap-3 absolute w-full h-full bg-siyah top-0 right-0'>
      <div className='bg-white p-7 text-center flex flex-col gap-2'>
          <h1 className='text-turuncu font-bold'>Delete Product!!</h1>
          <hr className='border-[#ccc]' />
          <p>You are about to delete this product. </p>
          <div>
          <button className='w-full bg-danger ease-in duration-300 hover:bg-orange text-white py-2 my-2 rounded-md'>Delete</button>
          <button className='w-full bg-success ease-in duration-300 hover:bg-bermuda text-white py-2 my-2 rounded-md'>Cancel</button>
            
          </div>
      </div>
      </div>
   
        
        
        </>
  )
}

export default Product
