import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../firebase/config'
import ResetImg from "../../images/forgot.png"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../component/Loader';
import { Link } from 'react-router-dom';

const Reset = () => {
  const [email,setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const resetPassword = (e) => {
      e.preventDefault()
      setIsLoading(true);
      sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email for a reset link");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });

  }
  return (
   <>
     {isLoading && <Loader/>}
    <div className='w-full h-[650px] flex items-center justify-center'>
      <div className='flex items-center gap-5 w-5/6 '>
        <div className='w-1/2 h-96 xl:flex lg:flex hidden'>
            <img src={ResetImg} alt="asas" className='w-full h-full object-contain'/>
        </div>
        <div className='xl:w-1/2 lg:w-1/2 w-[400px] border-[#f1f1f1] border-2 flex flex-col items-center justify-center mx-auto gap-5 p-9 shadow-xl rounded-xl'>
          <h1 className='text-2xl font-bold text-turuncu text-center'>Forgot Password</h1>
          <form onSubmit={resetPassword} className='flex flex-col gap-4 w-full'>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='py-2 px-4 w-full border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md' type="text" name="email" placeholder="Enter Your Email..."/>
            <button type="submit" className='bg-mavi text-white rounded-xl py-2 px-6  hover:bg-main ease-out duration-300 flex items-center justify-center w-full '>Reset Password </button>
          </form>
          <div className='flex w-full justify-between'>
            <Link to="/login" className="ease-in duration-300 cursor-pointer font-medium hover:text-turuncu"> &larr; Login</Link>
            <Link to="/register" className="ease-in duration-300 cursor-pointer font-medium hover:text-turuncu">Register 	&rarr;</Link>
          </div>
          
        </div>
      </div>
    </div>
   
   </>
  )
}

export default Reset