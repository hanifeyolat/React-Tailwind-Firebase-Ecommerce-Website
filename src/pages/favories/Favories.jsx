import React from 'react'
import { useSelector } from 'react-redux'
import { StoreFavories } from '../../redux/slices/ProductSlice'
import FavProduct from './FavProduct'


const Favories = () => {
  
  const ReduxFavs=useSelector(StoreFavories)
  
  return (
    <div className='min-h-[600px] w-full flex flex-col my-10'>
      <div className=' w-5/6 flex sm:flex-wrap xs:flex-wrap gap-4 items-center mx-auto'>
          {
              ReduxFavs.length === 0 ? 
                  <h1 className='text-3xl text-[#b0b0b0] '>
                    No products here! Please, add a product to your favories...
                  </h1> :
                  ReduxFavs.map( (product) => <FavProduct product={product} />)
          }
      </div>
    </div>
  )
}

export default Favories
