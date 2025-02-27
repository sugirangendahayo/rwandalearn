/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router-dom';
import React from 'react'
import image from '../assets/images/error.png'

const NotFound = () => {
  return (
    <div className='pb-4'>
      <div className=" flex-1 justify-center  ">
        <img src={image} alt="404" className="w-[40%] h-[30%] m-auto" />
      <div className='text-center py-2'>
        <span className="text-[30px] font-semibold">
          How did you get here?! It's cool. We'll help you out.
        </span>
      </div>
      <div className='text-center py-5'>
        <span className='px-3 py-4 bg-cyan-900 text-white rounded-[30px]'><NavLink to="/">Back to Homepage</NavLink>
        </span>
      </div>
      </div>
    </div>
  );
}

export default NotFound