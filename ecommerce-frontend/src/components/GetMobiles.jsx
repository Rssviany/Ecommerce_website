import React from 'react'
import { Link } from 'react-router-dom'
import CategoryCarousel from './CategoryCarousel'

function GetMobiles ()  {
  return (
    <>
      <div className='flex flex-col bg-white m-2 px-6 py-4 pb-10'>
        <h1 className='text-black font-semibold text-xl'>Up to 40% off | Best flagship phones on sale <span className='ml-5'><Link to={`category/mobiles`} className="text-blue-500 hover:border-b-1 hover:border-blue-500 text-sm">Explore more</Link></span></h1>
        {localStorage.getItem('token') && <CategoryCarousel category='mobiles'/>}
      </div>
    </>
  )
}

export default GetMobiles;