
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetchCollection from '../../../fetchData/useFetchCollection';
import { SET_PRODUCTS, StoreFilteredProducts } from '../../../redux/slices/ProductSlice';
import ProductFilter from './ProductFilter'
import ProductList from './ProductList'


const ProductPanel = () => {

  const dispatch = useDispatch()
  const [ OpenFilter , setOpenFilter ] = useState(false)
  const { data, isLoading } = useFetchCollection("products");
  
  useEffect(() => {
      console.log("OpenFilter: ", OpenFilter)
  },[OpenFilter])

  useEffect(() => {
    dispatch(
      SET_PRODUCTS ({
        products: data,
      })
    )
  },[dispatch,data])

  return (
        <div className='w-full'>
          <div className='flex flex-col items-center justify-center my-12 gap-4'>
              <div className=' w-4/5 flex gap-2 mx-auto sm:relative'>
                  <ProductFilter OpenFilter={OpenFilter} setOpenFilter={setOpenFilter}/>
                  <ProductList products={data} isLoading={isLoading} OpenFilter={OpenFilter} setOpenFilter={setOpenFilter}/>
              </div>       
          </div>
        </div>
     )
}

export default ProductPanel
