import React from 'react'
import LoaderImg from "../images/loader.gif"
import ReactDOM from 'react-dom'

const Loader = () => {
  return ReactDOM.createPortal (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-siyah ">
        <img src={LoaderImg} alt="" className='w-10 h-10'/>
    </div>,
    document.getElementById("loader")
  )
}

export default Loader