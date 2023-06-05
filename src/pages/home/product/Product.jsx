import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { ADD_TO_CART, INCREASE_CART_QUANTITY, StoreCartProducts } from '../../../redux/slices/CartSlice'
import { ADD_TO_FAVORIES, REMOVE_FROM_FAVORIES, StoreFavories, StoreProducts } from '../../../redux/slices/ProductSlice'


const Product = ({FlexRow, product}) => {

  const dispatch=useDispatch()
  const favPr = useSelector(StoreFavories)
  const ReduxProducts = useSelector(StoreProducts)
  const ReduxCartProducts = useSelector(StoreCartProducts)
  const ReduxFavoriesProducts = useSelector(StoreFavories)

  const AddToFavories = (e) => {
    let isThere=ReduxFavoriesProducts.find(item=> item.id.toLowerCase().includes(product.id.toLowerCase()))
    if(isThere){
      dispatch(REMOVE_FROM_FAVORIES({product}))
      toast.error("Product removed to favories.")
    }else{
      dispatch(ADD_TO_FAVORIES({product}))
      toast.success("Product added to favories.")
    }
  }

  const AddToCart = (e) => {   
    let isThere=ReduxCartProducts.find(item=> item.id.toLowerCase().includes(product.id.toLowerCase()))
    if(isThere){
      dispatch(INCREASE_CART_QUANTITY ({product}))
      toast.info("Product quantity increased.")
    }else{
      dispatch(ADD_TO_CART({product}))
      toast.success("Product added to cart.")
    }
  }


  return (
    <>
        <div key={product.id}
             className={FlexRow ? 'flex flex-col items-center relative w-full h-[350px] px-10 py-5 bg-white sm:px-7 sm:py-6 xs:px-7 xs:py-6' : 'flex flex-row gap-6 items-center relative bg-white w-full h-[250px] px-10 py-5 sm:px-7 sm:py-6 xs:px-7 xs:py-6 '}>
                <button type="button" 
                        data-id={product.id} 
                        onClick={(e) => AddToFavories(e)} 
                        className='absolute top-3 right-3 p-1 rounded-md bg-white hover:bg-[#eeeded] ease-in duration-300 shadow-md text-turuncu'>
                          &#10084;
                </button>

                <div className={FlexRow ? "w-56 h-56 flex items-center justify-center  overflow-hidden " : "w-56 h-56 flex items-center justify-center "}>
                  <img src={product.imageURL} alt={product.name} className={FlexRow ? "object-contain w-full h-full" :"object-contain w-full h-full"} />
                </div>
                <div className={FlexRow ? 'flex flex-col items-center mt-3' : 'flex flex-col w-3/5 items-center gap-3 '}>
                  <p className='font-bold sm:font-semibold xs:font-semibold text-xl sm:text-md xs:text-md  text-center'> {product.name}</p>
                  <h2 className='font-bold sm:font-semibold xs:font-semibold text-turuncu text-xl sm:text-md xs:text-md  text-center'>{`$${product.price}`}</h2>
                  {FlexRow ? null : (
                    <p className='xl:hidden lg:hidden md:hidden sm:hidden xs:hidden'> {product.desc}</p>
                  )}
                  <button data-id={product.id} type="button" onClick={AddToCart} className='bg-turuncu text-white rounded-xl py-1 px-5 sm:px-2 xs:px-2 mt-3 sm:mt-0 xs:mt-0 hover:bg-main ease-out duration-300 flex content-center'>Add To Cart </button>
                </div>
         </div>
    </>
  )
}

export default Product
