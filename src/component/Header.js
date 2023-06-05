import React, { useEffect, useState } from 'react'
import {FaShoppingCart, FaHouseUser , FaHeart} from "react-icons/fa"
import {GiHamburgerMenu} from "react-icons/gi"
import {Link, useNavigate} from "react-router-dom"
import Sidebar from "./Sidebar"
import Loader from './Loader'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_FAVORIES, StoreFavories } from '../redux/slices/ProductSlice'
import { CLEAR_CART, StoreCartProducts } from '../redux/slices/CartSlice'
import { selectUserIsLoggedIn, 
         selectUserName, 
         SET_PREVIOUS_URL, 
         USER_LOGIN, 
         USER_LOGOUT } from '../redux/slices/UserSlice'
import { RiLogoutBoxRFill } from 'react-icons/ri'

const Header = () => {

  const [menu,setMenu] =useState(false)
  const name = useSelector(selectUserName)
  const isLogin = useSelector(selectUserIsLoggedIn)
  const [displayName,setDisplayName] =useState(name)
  const [signIn ,setSignIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [CloseSidebar, setCloseSidebar] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  console.log("giriş yapan: ", name, isLogin)
  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setDisplayName(name)
          setSignIn(true)
        }
        dispatch(USER_LOGIN({user}))
      })
  }, [name])


  const userLogout = (e) => {
      signOut(auth).then(() => {
          dispatch(USER_LOGOUT())
          dispatch(CLEAR_CART())
          dispatch(CLEAR_FAVORIES())
          dispatch(SET_PREVIOUS_URL({path:""}))
          toast.info("Logout Successfull...")
          setDisplayName("")
          setSignIn(false)
          setIsLoading(false)
          navigate("/")
      }).catch((error) => {
          toast.error(error.message)
      });
  }

  const ReduxFavs = useSelector(StoreFavories)
  const ReduxCartProducts = useSelector(StoreCartProducts)
  const [cartItemsLength,setCartItemsLength] = useState(0)

  useEffect(()=>{
    let key=0
    ReduxCartProducts.map(item => key=key+item.quantity)
    setCartItemsLength(key)
  },[ReduxCartProducts])

  return (
    <>
    {isLoading && <Loader/>}
    <div className='w-full flex items-center  justify-center bg-current py-6 mx-auto'>
          <div className='w-4/5 flex gap-6 items-center justify-between'>
                  <div className='flex gap-6 items-center justify-between text-turuncu ' >
                      <Link to="/" className='link text-bold xl:text-4xl lg:text-4xl md:text-4xl sm:text-3xl xs:text-3xl font-semibold font-rubik'>
                        <span className='text-white'>H</span>NF.
                        </Link>   
                  </div>
                  <GiHamburgerMenu onClick={() => setMenu(!menu)} className="text-white cursor-pointer lg:hidden" size={30}/>
                  <div className="hidden lg:flex w-auto gap-6 justify-end">
                        <div className=" flex gap-6 ">
                          <Link to="/" className='link text-white font-semibold'> Home</Link>
                          <Link to="/contact" className='link text-white font-semibold' > Contact Us</Link>
                        </div>
                        <div className="flex gap-6 ">
                          <Link to="/favories" className='link text-white flex gap-1 relative items-center font-semibold'>Favories <FaHeart/> 
                          <span className=" badge flex items-center justify-center absolute text-xs font-semibold -top-3 -right-4 bg-turuncu w-5 h-5 rounded-full">{ReduxFavs.length}</span>
                          </Link>
                          <Link to="/cart" className='link text-white flex gap-1 relative items-center font-semibold'>Cart <FaShoppingCart/> 
                          <span className=" badge flex items-center justify-center absolute text-xs font-semibold -top-3 -right-4 bg-turuncu w-5 h-5 rounded-full">{cartItemsLength}</span>
                          </Link>
                        </div>
                  </div>
                  <div className='hidden lg:flex gap-6 justify-center items-center text-white'>
                       {signIn ? 
                              (
                                <div className=' flex gap-6 items-center'>
                                <Link to="/admin/home" className=' text-turuncu font-semibold flex gap-1 items-center justify-center '>
                                  <FaHouseUser/>Hi, {displayName} !
                                </Link>
                                <Link to="/" className='link text-white font-semibold flex gap-2 items-center' onClick={userLogout}>
                                  Logout <RiLogoutBoxRFill size={20} /></Link> 
                                </div>
                              )
                                  :  
                              (
                                <div className='flex gap-6'>
                                    <Link to="/login" className='link text-white font-semibold'>Login</Link>
                                    <Link to="/register" className='link text-white font-semibold'>Register</Link>
                                </div> 
                              )
                                
                        }
                      
                  </div>
          </div> 
          { menu ? <Sidebar menu={menu} setMenu={setMenu}/> : ""}                
      </div>
    </>
  )
}

export default Header