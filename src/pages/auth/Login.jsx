import React, {useEffect, useState} from 'react'
import LoginImg from "../../images/login.png"
import {BsGoogle} from "react-icons/bs"
import { signInWithEmailAndPassword , GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../component/Loader';
import { SET_PREVIOUS_URL, USER_LOGIN, selectPreviousURL, selectUserIsLoggedIn } from '../../redux/slices/UserSlice'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authLogin = useSelector(selectUserIsLoggedIn)
  const PreviousURL = useSelector(selectPreviousURL)



  const userLogin = (e) => {
      e.preventDefault()
      setIsLoading(true)

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          setIsLoading(false)
          toast.success("Login Successfull")
          dispatch(USER_LOGIN({user}))
          PreviousURL ==="/cart" ? navigate("/cart") : navigate("/")
          dispatch(SET_PREVIOUS_URL({ path:"" }))
          // ...
        })
        .catch((error) => {
          setIsLoading(false)
          toast.error(error.message)
        });
     }
  
     const provider = new GoogleAuthProvider();
     
  const GoogleLogin = (e) => {
    e.preventDefault()
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Login Successfully...")
        dispatch(USER_LOGIN({user}))
        PreviousURL ==="/cart" ? navigate("/cart") : navigate("/")
        dispatch(SET_PREVIOUS_URL({ path:"" }))
      }).catch((error) => {
        toast.error(error.message)
      });
  }

  return (
    <>
    {isLoading && <Loader/>}
    <div className='w-full h-[650px] flex items-center justify-center'>
      <div className='flex sm:flex-col md:flex-col lg:flex-row items-center gap-5 w-5/6  '>
        <div className='w-1/2 h-96 xl:flex lg:flex hidden'>
            <img src={LoginImg} alt="asas" className='w-full h-full object-contain'/>
        </div>
        <div className='xl:w-1/2 lg:w-1/2 w-[400px] border-[#f1f1f1] border-2 flex flex-col items-center justify-center mx-auto gap-5 p-9 shadow-xl rounded-xl'>
          <h1 className='text-2xl font-bold text-turuncu text-center'>Login</h1>
          <form onSubmit={userLogin} action="" className='flex flex-col items-center gap-4 w-full '>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='py-2 px-4  w-full border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' type="email" name="price" placeholder="Enter Your Email..." />
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='py-2 px-4 w-full justify-center border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' type="password" name="price" placeholder="Enter Your Password..."/>
            <button type="submit" className='bg-mavi text-white rounded-xl py-2 px-6 hover:bg-main ease-out duration-300 flex items-center justify-center  w-full '>Login </button>
            <Link to='/reset-password' className=' ease-in duration-300 cursor-pointer font-medium hover:text-turuncu -mb-4'> Forgot Password? Click here!</Link>
            <span className='text-[#b9b9b9] text-center'> -- or --</span>

              <button onClick={GoogleLogin} className='bg-turuncu text-white rounded-xl px-6 py-2 hover:bg-main ease-out duration-300 flex items-center gap-1 justify-center  w-full -my-4'> 
            <BsGoogle/>  Login with Google </button>

            <Link to="/register" className='ease-in duration-300 cursor-pointer font-medium hover:text-turuncu my-2' > Don't have an account? <span className="font-bold">Register</span></Link>
          </form>
       
         
        </div>
      </div>
    </div>
    </>
  )
}

export default Login