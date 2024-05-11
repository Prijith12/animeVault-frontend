import React from 'react'

function Footer() {
  return (
    <div className='bg-gray-800 text-white h-40   w-full'>
<div className='bg-gray-800 text-white bottom-0 w-full'>
      <div className="container mx-auto px-4 lg:px-0 py-8 flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0">
          <h1 className='text-center font-extrabold mb-2 lg:mb-4 shadow-black tracking-wide text-teal border-teal'>Anime Vault</h1>
          <div className='flex  lg:flex-row sm:flex-row'>
            <a href="/" className="mb-2 lg:mb-0 lg:mr-4 mr-4 ">Home</a>
            <a href="/" className="mb-2 lg:mb-0 lg:mr-4 ">Categories</a>
          </div>
        </div>
        <div>
          <p className="text-sm text-center lg:text-right">&copy; 2024 Anime Vault. All rights reserved.</p>
          <p className="text-sm text-center lg:text-right">Created by Prijith</p>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Footer
