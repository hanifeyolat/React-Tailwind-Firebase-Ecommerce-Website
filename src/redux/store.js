import { configureStore,combineReducers } from '@reduxjs/toolkit'
import AuthReducer from "./slices/UserSlice"
import ProductReducer from "./slices/ProductSlice"
import CartReducer from './slices/CartSlice'
import OrderReducer from './slices/OrderSlice'

const rootReducer=combineReducers({
  cart: CartReducer.reducer,
  product: ProductReducer.reducer,
  auth: AuthReducer.reducer,
  orders: OrderReducer.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  //middleware araştırrr (blank page hatası veriyor, bu yüzden kullanıyorum)
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})
export default store