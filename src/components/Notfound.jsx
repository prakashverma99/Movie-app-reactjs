import React from 'react'
import error from "/error.jpg"

const Notfound = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
    <img className=' h-[50%] object-cover' src={error} alt="" />
    </div>
  )
}

export default Notfound