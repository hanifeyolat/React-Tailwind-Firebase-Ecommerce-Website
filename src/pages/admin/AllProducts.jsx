import { useState,useEffect } from 'react';
import AdminSidebar from "./AdminSidebar"
import Product from "./Product.jsx"
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PRODUCTS, StoreProducts } from '../../redux/slices/ProductSlice';
import useFetchCollection from '../../fetchData/useFetchCollection';
import { HiUserCircle } from 'react-icons/hi';

const AllProducts = () => {

  const [ name, setName ] = useState("")
  const [ AdminSideBarOpen, setAdminSideBarOpen ] = useState(false)
  const { data, isLoading } = useFetchCollection("products")
  const ReduxProducts = useSelector(state => state.product.products)
  let [ filterArr, setFilterArr] = useState([...data])
  const dispatch = useDispatch()
 

  useEffect(()=>{
    dispatch(SET_PRODUCTS({products:data}))
    setFilterArr([...data])
  },[data])

  useEffect(()=>{
    setFilterArr([...data])
    name !=="" && setFilterArr(data.filter(item => item.name.toLowerCase().includes(name.toLowerCase())))
  },[name])


  return (
    <>
        {isLoading ? <ToastContainer/> : null}
        <div className='w-full flex xl:bg-[#f8f7f7] lg:bg-[#f8f7f7]  bg-white'>
             <AdminSidebar AdminSideBarOpen={AdminSideBarOpen} setAdminSideBarOpen={setAdminSideBarOpen}/>
             <div className='xl:w-3/4 lg:w-3/4 w-4/5  xl:p-10 lg:p-10 py-10 px-0 flex flex-col gap-5 md:mx-auto sm:mx-auto xs:mx-auto'>
             <div className="flex justify-between items-center w-full">
                  <h1 className='xl:text-3xl lg:text-3xl text-2xl font-bold text-gray-600'>All Products </h1>
                  <button onClick={() => setAdminSideBarOpen(!AdminSideBarOpen)} className="bg-blue hover:bg-[#000] transition ease-in duration-300 cursor-pointer xl:hidden lg:hidden flex items-center gap-2 text-white px-2 py-1 rounded-lg ">
                  <span>Show Admin SideBar</span>
                  <HiUserCircle size={30} className=""/>
                  </button>
              </div>
              <p> <span className='font-bold'>{data.length}</span> products found.</p>
              <input value={name} onChange={(e) => setName(e.target.value)}
                     type="text" className='bg-white border-[#d2d1d1] border-[1px] w-[350px] py-2 px-4 rounded-md' 
                     placeholder="Search a Product..." />

                {/* ---- MASAÜSTÜ ---- */}
                <table className='xl:flex lg:flex hidden flex-col mt-6 p-10 border-spacing-y-2 bg-white shadow-lg '>
                  <tr height="50"className='py-6 font-bold border-x-0 border-y-2 border-y-mavi flex items-center'>
                      <td className='w-1/12 h-auto'>No:</td>
                      <td className='w-2/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'></span> Image 
                      </td>
                      <td className='w-4/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'> </span> Name 
                      </td>
                      <td className='w-2/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'> </span> Category 
                      </td>
                      <td className='w-2/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'> </span> Price 
                      </td>
                      <td className='w-2/12 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'> </span> Action
                      </td>
                  </tr>

                  {
                      filterArr.length===0 ? (
                        <tr>
                            <td className='w-full h-auto p-6 text-xl text-center font-medium' colSpan={6}> No products found...</td>
                        </tr>
                      ) : 
                      filterArr.map((product,index) => {
                        return(
                          <Product product={product} no={index}/>
                        )
                      })
                  }
                
               </table>


                
                {/* ---- MOBİL ---- */}
                <table className='xl:hidden lg:hidden flex flex-col mt-6 p-10 border-spacing-y-2 bg-white shadow-lg '>
                  <tr height="50" className='py-6 font-bold border-x-0 border-y-2 border-y-mavi flex items-center'>
                      <td className='w-1/6 h-auto'>No:</td>
                      <td className='w-4/6 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'></span> 
                        Product 
                      </td>
                      <td className='w-1/6 h-auto'>
                        <span className=' h-14 border-l-2 border-l-silver pl-2'></span>
                         Action 
                      </td>
                  </tr>

                  {
                      filterArr.length===0 ? (
                        <tr>
                            <td className='w-full h-auto p-6 text-xl text-center font-medium' colSpan={6}> No products found...</td>
                        </tr>
                      ) : 
                      filterArr.map((product,index) => {
                        return(
                          <Product product={product} no={index}/>
                        )
                      })
                  }
                
               </table>



            </div>     
        </div>
    
     

    </>
  )
}

export default AllProducts
