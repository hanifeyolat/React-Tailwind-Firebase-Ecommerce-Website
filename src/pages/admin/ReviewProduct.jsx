import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import StarsRating from 'react-star-rate'
import { toast } from 'react-toastify'
import { db } from '../../firebase/config'
import { StoreProducts } from '../../redux/slices/ProductSlice'
import { selectUserID, selectUserName } from '../../redux/slices/UserSlice'


const ReviewProduct = () => {

    const {id} = useParams()
    const [Review, setReview] = useState("")
    const [Rate, setRate] = useState(0);
    const reduxProducts= useSelector(StoreProducts)
    const product = reduxProducts.find(item => item.id===id)
    const userID= useSelector(selectUserID)
    const userName= useSelector(selectUserName)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const SaveReview = (e) => {
        e.preventDefault()

        const newReview= {
            userID,
            userName,
            productID: product.id,
            product,
            rate: Rate,
            review:Review,
            createdAt: Timestamp.now().toDate()
        }

        try {

            addDoc(collection(db, "reviews"), {...newReview});  
            toast.success("Reviews saved successfully.");
            navigate(`/product-details/${id}`)

          } catch (error) {
            toast.error(error.message);
          }
    }


  return (

    <div className='xl:w-3/4 lg:w-3/4 w-4/5 xl:p-10 lg:p-10 py-2 px-0 flex flex-col mx-auto my-10 self-center gap-3'>
        <h1 className='xl:text-3xl lg:text-3xl text-2xl font-bold text-gray-600'>Rate This Product</h1>
        <p className='font-semibold'>Product Name : {product?.name}</p>
        <div className='w-36 h-36'>
           <img src={product?.imageURL} alt={product?.name} className="w-full h-full object-contain" />
        </div>
        <div className='xl:w-[600px] lg:w-[600px] md:w-[600px] sm:w-[450px] w-full h-auto shadow-lg bg-white border-[2px] border-[#eee] mt-4 p-6 flex flex-col gap-4'>
            <form onSubmit={SaveReview} className=" flex flex-col gap-4 w-full"> 
            <b>Rating:</b>
            <StarsRating required value={Rate} className="text-lg !my-2"
                         onChange={Rate => {setRate(Rate); }}/>

            <b>Review:</b>
            <textarea required className='border border-2 p-4 border-[#eee]' value={Review} onChange={(e) => setReview(e.target.value)}>

            </textarea>
            <button type='submit' className='bg-blue ease-in duration-300 hover:bg-main text-white p-2 my-2 rounded-md'>
                Submit Rating
            </button>
            </form>
        </div>
    </div>

  )

  
}

export default ReviewProduct