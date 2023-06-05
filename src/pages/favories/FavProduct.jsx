import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { ADD_TO_CART, INCREASE_CART_QUANTITY, StoreCartProducts } from '../../redux/slices/CartSlice'
import { ADD_TO_FAVORIES, REMOVE_FROM_FAVORIES, StoreFavories, StoreProducts } from '../../redux/slices/ProductSlice'



const FavProduct = ({product}) => {

  const ReduxProducts = useSelector(StoreProducts)
  const ReduxCartProducts = useSelector(StoreCartProducts)
  const dispatch=useDispatch()
  const favPr = useSelector(StoreFavories)

  const RemoveFromFavories = (e) => {
    toast.warning("Product removed here.")
    dispatch(REMOVE_FROM_FAVORIES({product}))
  }

  const AddToCart = (e) => {
    let isThere=ReduxCartProducts.find(item=> item.id.toLowerCase().includes(product.id.toLowerCase()))
    if(isThere){
      dispatch(INCREASE_CART_QUANTITY({product}))
      toast.info("Product quantity increased.")
    }else{
      dispatch(ADD_TO_CART({product}))
      toast.success("Product added to cart.")
    }

  }


  
  return (
  <>
    {<ToastContainer/>}
    <div key={product.id} className='flex flex-col items-center justify-between relative bg-white xl:w-[300px] lg:w-[300px] md:w-[300px] w-full h-[350px] px-10 py-8 overflow-hidden shadow-xl border-2 border-[#eee]'>
    
        <button type="button" 
                data-id={product.id} 
                onClick={(e) => RemoveFromFavories(e)} 
                className='absolute top-3 right-3 p-1 rounded-md bg-white hover:bg-[#eeeded] ease-in duration-300 shadow-md text-turuncu'>
                  &#10084;
        </button>
        <div className="w-60 h-60 flex items-center justify-center overflow-hidden ">
            <img src={product.imageURL} alt={product.name} className="object-contain w-full h-full " />
        </div>
        <div className='flex flex-col items-center mt-3' >
              <h2 className=' text-turuncu font-bold xl:text-xl lg:text-xl md:text-xl text-lg text-center'>{`$${product.price}`}</h2>
              <p className='font-semibold xl:text-xl lg:text-xl md:text-xl text-lg text-center'> {product.name}</p>
              <button data-id={product.id} type="button" onClick={AddToCart} className='bg-turuncu text-white rounded-xl py-1 px-5 mt-3 hover:bg-main ease-out duration-300 flex content-center'>Add To Cart </button>
        </div>
    </div>
  </>
  )
}

export default FavProduct
