import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import {FaShoppingCart, FaHouseUser , FaHeart} from "react-icons/fa"
import {AiOutlinePlus} from "react-icons/ai"
import { signOut } from 'firebase/auth'
import { selectUserIsLoggedIn, selectUserName, USER_LOGOUT } from '../redux/slices/UserSlice'
import { CLEAR_CART } from '../redux/slices/CartSlice'
import { CLEAR_FAVORIES, StoreFavories } from '../redux/slices/ProductSlice'
import { StoreCartProducts } from '../redux/slices/CartSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../firebase/config'
import { RiLogoutBoxRFill } from 'react-icons/ri'

const Sidebar = ({menu,setMenu}) => {
  const name = useSelector(selectUserName)
  const favProducts = useSelector(StoreFavories)
  const cartItems = useSelector(StoreCartProducts)
  const isLogin = useSelector(selectUserIsLoggedIn)
  const [displayName,setDisplayName] =useState(name)
  const [signIn ,setSignIn] = useState(false)
  const [ itemsLength , setItemsLength] = useState(0)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(()=> {
    setItemsLength(0)
    cartItems.map(p => setItemsLength((itemsLength) => itemsLength=itemsLength + p.quantity))
  },[cartItems])


  const userLogout = (e) => {
  
    signOut(auth).then(() => {
        dispatch(USER_LOGOUT())
        dispatch(CLEAR_CART())
        dispatch(CLEAR_FAVORIES())
        toast.info("Logout Successfull...")
        setDisplayName("")
        setSignIn(false)
        navigate("/")
    }).catch((error) => {
        toast.error(error.message)
    });
}

  return (
    <>
    {
      menu ? 
      <div className={menu ? 'fixed top-0 left-0 bg-siyah w-screen h-screen opacity-1 ease-in duration-300 z-[100] overflow-hidden .hide-scrolling .hide-scrollbar':'fixed top-0 left-0 bg-siyah w-screen h-screen opacity-1 ease-in duration-300 z-[100] overflow-hidden' }>
           <div className='w-[350px] h-full bg-main text-white p-10 relative  '>
              <button onClick={() => setMenu(false)} className="absolute top-5 right-5 w-6 h-6 bg-turuncu hover:bg-danger cursor-pointer ease-in duration-300 rounded-lg text-white origin-center text-lg flex items-center justify-center ">
                   <AiOutlinePlus className=" rotate-45 text-bold "/>
              </button>

                <div className="flex flex-col gap-4 w-auto justify-end">
                      <Link to="/" onClick={() => setMenu(!menu)} className='link border-b-[1px] border-b-[#072551]  hover:border-b-turuncu hover:text-turuncu ease-in duration-300  py-3 text-white font-semibold'> 
                            Home
                      </Link>
                      <Link to="/contact" onClick={() => setMenu(!menu)} className='link border-b-[1px] border-b-[#072551]  hover:border-b-turuncu hover:text-turuncu ease-in duration-300 py-3 text-white font-semibold' > 
                          Contact Us
                      </Link>
          
                      <Link to="/favories" onClick={() => setMenu(!menu)} className='link border-b-[1px] border-b-[#072551]  hover:border-b-turuncu hover:text-turuncu ease-in duration-300 py-3 text-white flex w-full gap-1 relative items-center font-semibold'>
                          Favories 
                          <div className="flex items-center gap-1 relative">
                              <FaHeart/> 
                              <span className="badge hover:text-white ease-in duration-300  flex items-center justify-center absolute text-xs font-semibold -top-4 -right-4 bg-turuncu w-5 h-5 rounded-full">{favProducts.length}</span>
                          </div>
                      </Link>
                  
                      <Link to="/cart" onClick={() => setMenu(!menu)} className='link border-b-[1px] border-b-[#072551] hover:border-b-turuncu hover:text-turuncu ease-in duration-300 py-3 text-white flex w-full  gap-1 relative items-center font-semibold '> 
                              Cart
                              <div className="flex items-center gap-1 relative">
                              <FaShoppingCart/> 
                              <span className="badge hover:text-white ease-in duration-300  flex items-center justify-center absolute text-xs font-semibold -top-4 -right-4 bg-turuncu w-5 h-5 rounded-full">{itemsLength}</span>
                              </div>
                      </Link>

                      {
                          isLogin ? (
                            <>
                                <Link to="/admin/home" onClick={() => setMenu(!menu)} className='link text-turuncu border-b-[1px] border-b-[#072551] hover:border-b-turuncu hover:text-turuncu ease-in duration-300 py-3 font-semibold flex gap-1 items-center '> 
                                    <FaHouseUser   className=''/> Hi, {name}!
                                </Link>
                                <Link to="/login" className=' link flex gap-2 items-center border-b-[1px] border-b-[#072551]  hover:border-b-turuncu ease-in duration-300 hover:text-turuncu py-3 text-white font-semibold' onClick={userLogout}>
                                      <RiLogoutBoxRFill size={20} /> Logout
                                 </Link>
                            </>
                          ) : (
                            <>
                              <Link to="/login" onClick={() => setMenu(!menu)} className='link text-white border-b-[1px] border-b-[#072551] hover:border-b-turuncu hover:text-turuncu ease-in duration-300 py-3 font-semibold flex gap-1 items-center '> 
                                Login
                              </Link>
                          
                          </>

                          )

                      }
                  


                     
                </div>
            </div>
        </div>
    : null
    }
    </>
  )
}

export default Sidebar