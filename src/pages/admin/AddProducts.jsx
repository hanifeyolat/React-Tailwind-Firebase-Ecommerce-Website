
import { useEffect, useState } from 'react'
import AdminSidebar from "./AdminSidebar"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase/config';
import { toast, ToastContainer } from 'react-toastify';
import { addDoc, collection, deleteDoc, doc, setDoc, Timestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreProducts } from '../../redux/slices/ProductSlice';
import useFetchCollection from '../../fetchData/useFetchCollection';
import { HiUserCircle } from 'react-icons/hi';


// let initialState = {
//   name:"" ,
//   imageURL: "",
//   price: 0,
//   category: "",
//   brand: "",
//   desc: ""
// }

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
  { id: 5, name: "Makeup" },
];

let initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: ""
}


const AddProduct = () => {

  const {id}=useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [ AdminSideBarOpen, setAdminSideBarOpen ] = useState(false)
  const navigate = useNavigate()
  const firestoreProducts = useFetchCollection("products").data
  let editProduct = firestoreProducts.find(item=> item.id===id)
  const [product, setProduct] = useState(editProduct?.id.includes(id) ? {...editProduct} : {...initialState});


  useEffect(()=> {
    setProduct({...editProduct})
  }, [editProduct])

  const handleInput = (e) => {

      const {name , value } = e.target
      if(editProduct!==undefined) {
        setProduct({ ...editProduct, [name]: value });
      }else{
        setProduct({ ...product, [name]: value });
      }

  }

  const uploadImageToFirebase = (e) => {

    const file = e.target.files[0]

    const storageRef  = ref(storage, `hnf/${Date.now()}${file.name}`);  // dosyanın referansı
    const uploadTask = uploadBytesResumable(storageRef, file);
     // image yüklenme çubuğu ve img url  için 
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully.");
          });
        }
      );
  

  }
  
  const addToFirebase = (e) => {
      
    if(editProduct!==undefined){
        try {
          deleteDoc(doc(db, "products", editProduct.id))
          setDoc(doc(db, "products", id) , {...product})
          navigate("/admin/all-products")
          toast.success("Product edited successfully.");     
        } catch (error) {
          toast.error(error.message);
        }
    }else{
      try {
        addDoc(collection(db, "products"), {
          name: product.name,
          imageURL: product.imageURL,
          price: Number(product.price),
          category: product.category,
          brand: product.brand,
          desc: product.desc,
          createdAt: Timestamp.now().toDate(),
        });
        setProduct({ ...initialState });
        navigate("/admin/all-products")
        toast.success("Product added successfully.");
      } catch (error) {
        toast.error(error.message);
      }

    }    
  }

  


  return (
    <>
         {isLoading ? <ToastContainer/> : null} 
   
         <div className='w-full flex h-full xl:bg-[#f8f7f7] lg:bg-[#f8f7f7]  bg-white'>
             <AdminSidebar AdminSideBarOpen={AdminSideBarOpen} setAdminSideBarOpen={setAdminSideBarOpen} />
            
            <div className='xl:w-3/4 lg:w-3/4 w-4/5 mx-auto xl:p-10 lg:p-10 px-0 py-8 flex flex-col gap-5'>
                <div className='flex justify-between items-center'>
                    <h1 className='xl:text-3xl lg:text-3xl text-2xl font-bold text-gray-600'>
                        {editProduct ? "Edit Product" : "Add Product"}   
                    </h1>
                    <button onClick={() => setAdminSideBarOpen(!AdminSideBarOpen)} className="bg-blue hover:bg-[#000]  transition ease-in duration-300 cursor-pointer xl:hidden lg:hidden flex items-center gap-2  text-white px-2 py-1 rounded-lg ">
                        <span>Show Admin SideBar</span>
                        <HiUserCircle size={30} className=""/>
                    </button>
                </div>

                <div className="border-[1px]  xl:w-[600px] lg:w-[600px] md:w-[650px] w-full bg-white border-[#ebebeb] rounded-lg shadow-lg p-8 mb-8">
                    <h1 className='text-xl font-medium text-gray-600'>
                        {editProduct ? "Update your product details" : " Enter your product details"}    
                    </h1>  
                    <form className='flex flex-col my-4 gap-2' onSubmit={(e) => addToFirebase(e)}>
                      <label className=" font-medium " htmlFor="fname"> Product Name: </label>
                      <input required
                             className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
                             type="text" value={product.name} 
                             name="name" placeholder="Enter Your Product Name" 
                             onChange={(e) => handleInput(e)}/>

                      <label className=" font-medium " htmlFor="address-1"> Product Image: </label>
                      {editProduct? <img src={editProduct.imageURL} alt={editProduct.name} className="w-36 h-w-36"/> : null }
                      <input required={id==="ADD"}
                             type="file" onChange={(e) => uploadImageToFirebase(e)} 
                             className='py-1 border-[#a6a6a6] rounded-md' 
                             name="image" accept="image/*"/>
            
                      <label className=" font-medium " htmlFor="address-2">Product Price:</label>
                      <input required className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
                             type="text" value={product.price}  
                             onChange={(e) => handleInput(e)} name="price" placeholder="Enter Your Product Price "/>

                      <label className=" font-medium " htmlFor="category"> Product Category: </label>
                      <select required value={product.category} 
                              onChange={(e) => handleInput(e)} name="category"  
                              className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md '>

                          <option value="" disabled>
                          -- choose product category --
                          </option>
                          {
                            categories.map(cat => {
                              return (<option key={cat.id} value={cat.name}> {cat.name}</option>)
                            })
                          }
                      </select>
                      
                      <label className=" font-medium " htmlFor="fname"> Product Company/Brand: </label>
                      <input required 
                             className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
                             type="text" value={product.brand}  
                             onChange={(e) => handleInput(e)} name="brand" 
                             placeholder="Enter Your Product Company/Brand"/>

                      <label className=" font-medium " htmlFor="postalCode"> Product Description: </label>
                      <textarea required className='py-1 px-4 border-[1px] bg-[#f6f6f6] border-[#a6a6a6] rounded-md ' 
                                type="text" value={ product.desc} 
                                onChange={(e) => handleInput(e)} 
                                name="desc" placeholder={product.desc} />

                      <button onClick={(e) =>addToFirebase} type="submit" 
                              className='bg-mavi text-white rounded-xl py-1 px-3 mt-3 hover:bg-main ease-out duration-300 flex items-center justify-center !text-center w-[150px] '>
                               <p>{editProduct ? "Update Product" : "Add Product"} </p>
                      </button>

                    </form>
                </div>
            </div>     
         </div> 
    </>
  )
}

export default AddProduct
