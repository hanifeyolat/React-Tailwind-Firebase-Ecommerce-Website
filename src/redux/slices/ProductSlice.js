import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    products: localStorage.getItem("products") ? [...JSON.parse(localStorage.getItem("products"))] : [],
    favories: localStorage.getItem("favories") ? [...JSON.parse(localStorage.getItem("favories"))] : [],
    filteredProducts:[],
    paginationProducts:[],
}

export const ProductReducer = createSlice({
    name:"product",
    initialState,
    reducers:{
        SET_PRODUCTS (state,action){
            state.products=action.payload.products
            state.filteredProducts=state.products
            localStorage.setItem("products",JSON.stringify(state.products))
        },

        ADD_TO_FAVORIES(state,action){
            state.favories = [...state.favories , action.payload.product]
            localStorage.setItem("favories", JSON.stringify(state.favories))
        },  
        REMOVE_FROM_FAVORIES(state,action){
            state.favories = state.favories.filter(fav=> fav.id !==action.payload.product.id)
            localStorage.setItem("favories", JSON.stringify(state.favories))
        },
        CLEAR_FAVORIES(state){
            state.favories = []
        },
        /*  ----- FİLTERED PRODUCTS START ----- */
        FILTER_BY_NAME:(state,action) => {
            state.filteredProducts=state.products
            const name=action.payload
            const oldFilter=current( state.filteredProducts)
            state.filteredProducts=oldFilter.filter(item => item.name.toLowerCase().includes(name))
        },
        FILTER_BY_SORT:(state,action) => {
            let filterArray = current(state.filteredProducts)            
            switch(action.payload.option) {
                case "highest price":
                    state.filteredProducts=[...filterArray].sort((a,b)=> {
                        return b.price -a.price
                    })
                    break;
                case "lowest price":
                    state.filteredProducts=[...filterArray].sort((a,b)=> {
                        return a.price -b.price
                    })
                    break;
                case "a-z":
                    state.filteredProducts=[...filterArray].sort((a,b)=> {
                        return a.name.localeCompare(b.name)               
                    })
                    break;
                case "z-a":
                    state.filteredProducts=[...filterArray].sort((a,b)=> {
                        return b.name.localeCompare(a.name)               
                    })
                    break;  
                default:
                    return state
           }  
        },
        FILTER_BY_OTHERS:(state,action) => {
            const category = action.payload.Category
            const brand = action.payload.Brand
            const price = action.payload.Price

            state.filteredProducts=state.products
            let AllFilterProducts=[...current(state.filteredProducts)]
            
            let newArr=[]
            category==="All" ? 
            newArr=[...AllFilterProducts] : newArr=[...AllFilterProducts.filter(item=> item.category ===category)]
            
            let newArr2=[]
            brand==="All" ? 
            newArr2=[...newArr] : newArr2=[...newArr.filter(item=> item.brand ===brand)]
            
            let newArr3=[]
            price === 0 ? 
            newArr3=[] : newArr3=[...newArr2.filter(item=> item.price <= price)]

            state.filteredProducts=[...newArr3]
        }
        /*  ----- FİLTERED PRODUCTS END ----- */
    }
})

export const {  SET_PRODUCTS,
                ADD_TO_FAVORIES,
                REMOVE_FROM_FAVORIES,
                CLEAR_FAVORIES,
                FILTER_BY_NAME,
                FILTER_BY_SORT,
                FILTER_BY_OTHERS } = ProductReducer.actions
                
export const StoreProducts = (state) => state.product.products
export const StoreFavories = (state) => state.product.favories
export const StoreFilteredProducts = (state) => state.product.filteredProducts

export default ProductReducer