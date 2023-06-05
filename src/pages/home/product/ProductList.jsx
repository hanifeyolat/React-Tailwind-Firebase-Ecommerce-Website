import React, { useState,useEffect } from 'react'
import { HiOutlineSearch, HiViewGrid, HiViewList } from 'react-icons/hi'
import Product from './Product'
import Spinner from "../../../images/spinner.jpg"
import { useDispatch, useSelector } from 'react-redux'
import {FILTER_BY_NAME, FILTER_BY_SORT, StoreFilteredProducts} from "../../../redux/slices/ProductSlice"
import { AiFillSetting } from 'react-icons/ai'


const ProductList = ({products,isLoading,OpenFilter,setOpenFilter}) => {

    const [option, setOption] = useState("lowest price")
    const [Search, setSearch] = useState("")
    const [FlexRow, setFlexRow] = useState(true)
    const dispatch=useDispatch()
    const ReduxFilteredPr = useSelector(StoreFilteredProducts)


    useEffect(() => {
      console.log("FlexRow: ", FlexRow)
    },[FlexRow])


    useEffect(() => {
        dispatch(FILTER_BY_SORT({option}))
    } , [option])

    useEffect(() => {
      let newSearch=Search.toLowerCase()
      dispatch(FILTER_BY_NAME(newSearch))
    } , [Search,dispatch])
  
  return (
      <>
        {isLoading ? 
            <div className='w-5/6 flex flex-col items-center justify-center'>
              <img src={Spinner} alt="Loading.." className='w-40 h-40'/>
            </div>
            : (
            <div className='xl:w-3/4 lg:w-3/4 w-full flex flex-col'>
                <div className='py-2 flex justify-between items-center border-b-2 border-b-metal'>
                        <div className='flex flex-row gap-1'>
                            <button className='text-turuncu' onClick={() => setFlexRow(true)}> <HiViewGrid size={27} className="pointer-events-none"/> </button>
                            <button className='text-turuncu' onClick={() => setFlexRow(false)}> <HiViewList size={27} className="pointer-events-none"/> </button>
                            <p className='pr-5 xl:flex lg:flex md:hidden sm:!hidden xs:hidden'> <span className='font-bold'> 16</span> products found.</p>
                        </div>
                        <div className='flex items-center pr-3 w-2/6 sm:w-1/2 border-2 border-silver 2xl:inline-flex xl:inline-flex lg:inline-flex md:hidden sm:hidden xs:hidden'>

                            <input type="text" 
                                   value={Search}
                                   placeholder="Search Product..." 
                                   onChange={(e) => setSearch(e.target.value) }
                                   className='w-full h-full py-2 px-4 outline-none xl:placeholder:text-gray-500/50 lg:placeholder:text-gray-500/50 md:placeholder:text-gray-500/50 
                                              sm:placeholder:text-gray-500/50  border-1 border-metal'/> 
                                   <HiOutlineSearch/> 
                        </div>
                        <select onChange={(e) => setOption(e.target.value.toLowerCase())} name="brand" id="brands" 
                                className='w-1/7 border-2 border-silver rounded-md p-1 2xl:flex xl:flex lg:flex md:hidden sm:hidden xs:hidden'>
                            <option value="Highest Price">Highest Price</option>
                            <option value="Lowest Price">Lowest Price</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                        </select>
                      <button onClick={()=> setOpenFilter(true)} className='xl:hidden lg:hidden md:flex sm:flex xs:flex items-center gap-2 cursor-pointer text-turuncu'>
                          <AiFillSetting/>
                          <b>Show Filters</b>
                      </button>
                </div>
                <div className={ FlexRow ? `grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 bg-[#f6f6f6]  overflow-y-scroll h-[550px] gap-4 p-6 ` : 
                                           `flex flex-col w-full  p-6 bg-[#f6f6f6] gap-4 overflow-y-scroll h-[550px]`}>
                    {
                      ReduxFilteredPr.length===0 ? (
                        <h1 className='text-2xl text-[#909090] '>No products here to buy ...</h1>
                      ) : (
                        ReduxFilteredPr.map((product, index) => <Product FlexRow={FlexRow} product={product} key={index} />)
                      )
                    }
                    
                </div>
             
            </div>
        )}
      </>
  )
}

export default ProductList