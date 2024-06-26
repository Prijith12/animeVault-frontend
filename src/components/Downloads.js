import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Downloads() {
const navigate=useNavigate();
  const handleGoToHome=()=>{
    navigate('/')
  }
  return (
      <div className='bg-gradient-to-b from-black to-gray-900 min-h-screen flex justify-center'>
      <div className="not-found-modal">
            <div className="not-found-content flex flex-col ">

              <h1 className="font-bold text-2xl mb-4 text-gray-200 pl-5 text-center w-full pt-14">No downloads available.</h1>
              <div className='flex items-center'>
                <button onClick={handleGoToHome} className="  hover:bg-gray-500 font-bold h-10  w-full  text-white bg-opacity-25 border border-white rounded-lg ">
                  Go to Home
                </button>
              </div>


            </div>
          </div>
      </div>
    
  )
}

export default Downloads
