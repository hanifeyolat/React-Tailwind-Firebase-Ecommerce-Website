import React from 'react'
import { sliderData } from './SliderData'
import {AiOutlineArrowLeft,AiOutlineArrowRight} from "react-icons/ai"
import { useState } from 'react'
import { useEffect } from 'react'


const Slider = () => {
  const dataLong = Number(sliderData.length)
  const [counter,setCounter] = useState(1)

  useEffect(() => {
    setCounter(1)
  },[])

  const nextSlide = () => {
    counter === sliderData.length ? setCounter(1) : setCounter(counter+1)
  }

  const prevSlide = () => {
    counter === 1 ? setCounter(sliderData.length) : setCounter(counter-1)
  }

  let autoScroll=true
  let slideInterval;
  
  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, 5000);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [counter, slideInterval, autoScroll]);

  return (
        <div className="slider relative w-full xl:h-[600px] lg:h-[500px] md:h-[400px] flex flex-row items-center justify-center overflow-hidden">
       
         { 
              sliderData.map((slide) => 
                Number(slide.id)===counter ? (
                    <>
                    <img src={slide.image} alt="" className='w-full bg-contain object-cover duration-700 ease-in'/>
                    <div className='absolute left-3/5 xl:w-1/3 lg:w-1/3 md:w-2/3 sm:w-2/3 xs:w-[300px] bg-siyah xl:p-12 lg: md:p-10 sm:p-8 xs:p-6 text-white flex flex-col gap-3 items-center justify-center duration-700 ease-in'>
                      <h1 className='xl:text-4xl lg:tex-3xl md:text-2xl sm:text-xl xs:text-lg font-bold text-center'>{slide.heading}</h1>
                      <p>{slide.desc}</p>
                      <hr className=' w-4/5 border-3 border-white '/>
                      <button className=' bg-blue ease-in duration-700 hover:bg-main text-white py-2 px-6 rounded-md'>Send Message</button>
                    </div>
                  </>
                  ): null
              )
         }
        
         <div className='w-11/12 h-full flex items-center justify-between absolute  '>
           <button onClick={prevSlide}>   
              <AiOutlineArrowLeft  size={30} className="arrow prev border-2 bg-black  rounded-full flex items-center justify-center hover:bg-siyah ease-in duration-300 hover:text-white cursor-pointer" />
           </button>
           <button onClick={nextSlide}> 
              <AiOutlineArrowRight  size={30} className="arrow next border-2 bg-black  rounded-full flex    items-center justify-center hover:bg-siyah ease-in duration-300 hover:text-white cursor-pointer" />
           </button>

         </div>
        </div>
  )
}

export default Slider
