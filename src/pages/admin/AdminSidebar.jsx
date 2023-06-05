
import { HiUserCircle } from "react-icons/hi"
import { Link } from 'react-router-dom'
import { AiFillCloseCircle } from "react-icons/ai"

const AdminSidebar = ({AdminSideBarOpen, setAdminSideBarOpen}) => {
 
  return (
        <>
            {/*  MASAÜSTÜ  */}
            <div className={AdminSideBarOpen ? "hidden" : 'w-1/4  border-r-silver border-r-2 xl:flex lg:flex flex-col hidden z-[250] bg-white'}>
                <div className='flex items-center justify-center w-full bg-blue text-white p-12'>
                    <div className='flex flex-col items-center'>
                        <HiUserCircle size={"4rem"}/>
                        <p className='text-lg font-semibold'>Admin Panel</p> 
                    </div>
                </div>
                <div className='w-full'>
                    <Link to="/admin/home"
                    className='w-full block border-b-silver border-b-2 py-3 px-5'> Home </Link>
                    <Link to="/admin/all-products"
                    className='w-full block border-b-silver border-b-2 py-3 px-5'> All Products</Link>

                    <Link to="/admin/add-products/add"
                        className='w-full block border-b-silver border-b-2 py-3 px-5'> Add Product </Link>

                    <Link to="/admin/orders"
                    className='w-full block py-3 px-5'> Orders </Link>
                </div>
            </div>

            {/*  MOBİL  */}
            <div className={AdminSideBarOpen ? 'w-full h-full bg-[rgb(0,0,0,.8)] fixed top-0 left-0 z-[250]' : "hidden"}>
                <div className='w-[350px] h-full bg-white'>
                        <div className='flex items-center justify-center w-[350px] h-[200px] bg-blue text-white p-12 relative'>
                            <div className='flex flex-col items-center'>
                                <HiUserCircle size={"4rem"}/>
                                <p className='text-lg font-semibold'>Admin Panel</p> 
                            </div>
                            <AiFillCloseCircle onClick={() => setAdminSideBarOpen(!AdminSideBarOpen)} size={25} className=" absolute top-5 right-5 text-white hover:text-[#000] transition ease-in duration-300 cursor-pointer z-50"/>
                        </div>
                        <div className='w-full h-full'>
                            <Link to="/admin/home"
                                className='w-full block border-b-silver border-b-2 py-3 px-5 hover:text-blue transition ease-in duration-300'> Home </Link>
                            <Link to="/admin/all-products"
                                className='w-full block border-b-silver border-b-2 py-3 px-5 hover:text-blue transition ease-in duration-300'> All Products</Link>
                            <Link to="/admin/add-products/add"
                                className='w-full block border-b-silver border-b-2 py-3 px-5 hover:text-blue transition ease-in duration-300'> Add Product </Link>
                            <Link to="/admin/orders"
                            className='w-full block py-3 px-5 hover:text-blue transition ease-in duration-300'> Orders </Link>
                        </div>
                 </div>
            </div>
        </>
  )
}

export default AdminSidebar
