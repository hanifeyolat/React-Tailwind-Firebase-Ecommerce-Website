
import { useEffect, useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai"
import {IoIosArrowForward} from "react-icons/io"

import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_OTHERS } from "../../../redux/slices/ProductSlice"

const ProductFilter = ({OpenFilter , setOpenFilter}) => {
  
  const ReduxProducts = useSelector(state => state.product.products)
  const categories = [
    "All",
    ...new Set(ReduxProducts.map((product) => product.category)),
  ];
  const brands = [
    "All",
    ...new Set(ReduxProducts.map((product) => product.brand)),
  ];
  const prices = [
    // new Set() komutu ile array içindeki tekrar eden objeleri sildik.
    ...new Set(ReduxProducts.map((product) => product.price)),
  ];
 
  const [minPrice,setMinPrice] = useState(Math.min(...prices))
  const [maxPrice,setMaxPrice] = useState(Math.max(...prices))
  const [Price,setPrice] = useState(maxPrice)
  const [Brand,setBrand] = useState("All")
  const [Category,setCategory] = useState("All")
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(FILTER_BY_OTHERS({Category,Price,Brand}))
  }, [Brand,Price,Category])
  
  const clearFilter = () => {
    setBrand("All")
    setCategory("All")
    setPrice(maxPrice)
    dispatch(FILTER_BY_OTHERS({Category,Price,Brand}))
  }
    
  return (
      <>
          {/* MASAÜSTÜ */}
          <div className={
                "bg-white w-1/4 xl:flex lg:flex hidden flex-col xl:border-1 lg:border-1 md:border-1 xs:border-[#f2f2f2] xl:shadow-none lg:shadow-none md:shadow-none transition ease-in duration-300"}>  

                <div className='flex flex-col w-full '>
                    <h1 className='font-bold text-xl py-4 '>Categories</h1>
                    <div className='flex flex-col justify-start box-border w-3/4'>
                        {
                            categories.map((cat,index) => {
                                return (
                                <button onClick={() => setCategory(cat)}
                                        key={index} 
                                        className='flex flex-row gap-2 items-center border-b-2 border-b-silver py-2 font-semibold hover:text-turuncu ease-in duration-200'>
                                          <IoIosArrowForward/> 
                                          <span>{cat} </span>
                                </button>
                                )
                            })
                        }
                    </div>
                    <h1 className='font-bold text-xl py-4'>Brands</h1>
                    <select onChange={(e)=>setBrand(e.target.value)} name="brand" id="brands" className='w-4/6 border-2 border-silver rounded-md p-1'>
                        {
                          brands.map((brand,index) => {
                            return (
                              <option value={brand} key={index}>{brand}</option>
                            )
                        })
                        }
                    </select>
                    <h1 className='font-bold text-xl py-4 '>Price</h1>
                    <p className='text-lg text-black-500'> {Price === 0 ? `$${minPrice} - $${maxPrice}`  : `$${Price}`} </p>
                    <input type="range" className='w-1/2' max={maxPrice} min={0} onChange={ (e) => setPrice(e.target.value)}/>
                    <button onClick={() => clearFilter()} className='bg-turuncu py-1 px-2 lg:py-[2px] lg:px-1 lg:text-md rounded-xl text-lg w-40 my-3 text-white font-normal'>Clear Filters </button>
                </div>               
           </div>

          {/* MOBİL */}
           <div className={OpenFilter ? "w-full h-full bg-[rgba(0,0,0,.8)] fixed top-0 right-0 z-50" : "hidden" }>
              <div className="fixed top-0 left-0 bg-white w-[350px] h-full shadow-lg p-10">  
                      <AiFillCloseCircle onClick={() => setOpenFilter(!OpenFilter)} size={25} className=" absolute top-10 right-10 text-turuncu hover:text-[#000] transition ease-in duration-300 cursor-pointer"/>
                    <div className='flex flex-col w-full '>
                        <h1 className='font-bold text-xl py-4 '>Categories</h1>
                        <div className='flex flex-col justify-start box-border w-3/4'>
                            {
                                categories.map((cat,index) => {
                                    return (
                                    <button onClick={() => setCategory(cat)}
                                            key={index} 
                                            className='flex flex-row gap-2 items-center border-b-2 border-b-silver py-2 font-semibold hover:text-turuncu ease-in duration-200'>
                                              <IoIosArrowForward/> 
                                              <span>{cat} </span>
                                    </button>
                                    )
                                })
                            }
                        </div>
                        <h1 className='font-bold text-xl py-4'>Brands</h1>
                        <select onChange={(e)=>setBrand(e.target.value)} name="brand" id="brands" className='w-4/6 border-2 border-silver rounded-md p-1'>
                            {
                              brands.map((brand,index) => {
                                return (
                                  <option value={brand} key={index}>{brand}</option>
                                )
                            })
                            }
                        </select>
                        <h1 className='font-bold text-xl py-4 '>Price</h1>
                        <p className='text-lg text-black-500'> {Price === 0 ? `$${minPrice} - $${maxPrice}`  : `$${Price}`} </p>
                        <input type="range" className='w-1/2' max={maxPrice} min={0} onChange={ (e) => setPrice(e.target.value)}/>
                        <button onClick={() => clearFilter()} className='bg-turuncu py-1 px-2 lg:py-[2px] lg:px-1 lg:text-md rounded-xl text-lg w-40 my-3 text-white font-normal'>Clear Filters </button>
                    </div>               
              </div>
            </div>               
      </>
  )
}

export default ProductFilter