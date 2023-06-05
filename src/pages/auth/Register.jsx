import React, {useEffect, useState} from 'react'
import RegisterImg from "../../images/register.png"
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../component/Loader';
import { useSelector } from 'react-redux';
import { selectUserIsLoggedIn } from '../../redux/slices/UserSlice';

const Register = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [password2,setPassword2] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

 
  const RegisterUser =(e) => {
      e.preventDefault()
      setIsLoading(true)
      if(password !== password2){
        toast.error("Passwords dont match!!")
      }
      setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            toast.success("Registration Successfull")
            setIsLoading(false)
            navigate("/")
            // ...
          })
          .catch((error) => {
            toast.error(error.message)
            setIsLoading(false)
            // ..
          }); 
        
   
  }
   

  return (
    <>
        {isLoading && <Loader/>}
        <div className='w-full h-[650px] flex items-center justify-center'>
          <div className='flex items-center gap-5 w-2/3 '>
            <div className='xl:w-1/2 lg:w-1/2 w-[400px] border-[#f1f1f1] border-2 flex flex-col items-center justify-center mx-auto gap-5 p-9 shadow-xl rounded-xl'>
              <h1 className='text-2xl font-bold text-turuncu text-center'>Register</h1>
              <form onSubmit={RegisterUser}  className='flex flex-col gap-4 w-full'>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className='py-2 px-4 w-full border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md '   type="email" name="price" placeholder="Enter Your Email..."/>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className='py-2 px-4 w-full border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md '   type="password" name="password" placeholder="Enter Your Password..."/>
                <input onChange={(e) => setPassword2(e.target.value)} value={password2} className='py-2 px-4 w-full border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md '   type="password" name="password2" placeholder="Enter Your Password Again..."/>
                <button type="submit" className='bg-mavi text-white rounded-xl py-2 px-6  hover:bg-main ease-out duration-300 flex items-center justify-center w-full '>Register </button>
              </form>
                <Link to="/login" className=' ease-in duration-300 cursor-pointer font-medium hover:text-turuncu my-2' > Already have an account? <span className="font-bold">Login</span></Link>
            </div>
            <div className='w-1/2 h-96 xl:flex lg:flex hidden'>
                <img src={RegisterImg} alt="asas" className='w-full h-full object-contain'/>
            </div>
          </div>
        </div>
    </>
  )
}

export default Register