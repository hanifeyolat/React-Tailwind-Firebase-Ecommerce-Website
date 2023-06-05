import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import StarsRating from 'react-star-rate'
import { toast } from 'react-toastify'
import useFetchCollection from '../../../fetchData/useFetchCollection'
import { db } from '../../../firebase/config'
import { ADD_TO_CART } from '../../../redux/slices/CartSlice'
import { StoreProducts } from '../../../redux/slices/ProductSlice'

const ProductDetails = () => {

  const {id} = useParams()
  const ReduxProducts= useSelector(StoreProducts)
  let {data, isLoading} = useFetchCollection("reviews")
  const reviews = data.filter(item => item.productID===id) 
  const product=ReduxProducts.find(item => item.id===id)
  
  function convertDate(time) {
    //time should be server timestamp seconds only
    let dateInMillis = time * 1000
    let date = new Date(dateInMillis)
    let myDate = date.toLocaleDateString()
    let myTime = date.toLocaleTimeString()
    myDate = myDate.replaceAll('/', '-')
    return myDate + " - " + myTime
  }
  const dispatch=useDispatch()

  const AddToCart = (e) => {
    dispatch(ADD_TO_CART({product}))
  }

  return (
    <div className='w-4/5 py-2 px-0 mx-auto my-10 flex flex-col self-center gap-2'>
      <h1 className='text-3xl font-bold text-gray-600'>Product Details</h1>
      <Link to='/' className='!py-2 ease-in duration-300 cursor-pointer font-medium hover:text-turuncu'> &larr; Go To Home Page</Link>
      {
          product ? (
              <>
                  <div className='flex xl:flex-row lg:flex-row flex-col gap-10'>
                      <div className='flex gap-5 border-2 border-[#f8f8f8] xl:w-1/2 lg:w-1/2 w-full p-12 object-contain'>
                          <div className='w-82 h-82'>
                             <img src={product.imageURL} alt={product.name} className="w-full h-full object-contain"/>
                          </div>
                      </div>
                      <div className='flex flex-col gap-5 xl:w-1/2 lg:w-1/2 w-full '>
                        <h1 className='xl:text-3xl lg:text-3xl text-2xl font-bold text-gray-600'>{product?.name}</h1>
                        <b className='text-2xl font-medium text-turuncu -my-2'>₺{product?.price}</b>
                        <p className='text-md font-normal text-gray-200'>{product?.desc} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore dicta vel, deleniti nostrum praesentium atque odit officiis quaerat! Corrupti, accusantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis temporibus aliquid impedit animi tempore sequi excepturi praesentium modi, voluptatibus accusantium.</p>
                        <button onClick={AddToCart} className='bg-turuncu ease-in duration-300 hover:bg-main text-white p-2 my-2 rounded-md w-[150px]'>
                              Add To Cart
                        </button>
                      </div>
                  </div>
              
              </>
            ) : null
      }

      <div className='flex flex-col gap-5'>
          <h1 className='text-xl font-medium text-gray-600'> Product Reviews</h1>
          <hr className='border-[#e2e2e2]'/>

        {
          reviews?.length===0 ? <h1>No Reviews found for this product.</h1> : 
       
            reviews.map( (item,idx) => (
              <div key={idx} className="border-[#f6f6f6] border-[1px] p-4 flex flex-col gap-3" >
                 <StarsRating value={item.rate} disabled  />
                 <p className='text-lg'>{item.review}</p>
                 <div className='flex flex-col gap-[1px]'>
                    <b className='text-md'>by {item.userName}</b>  <em className='text-sm'>createdAt : { convertDate(item.createdAt.seconds) }</em>
                 </div>

              </div>
            ))
         
        }
        

      </div>

    </div>
  )
}

export default ProductDetails