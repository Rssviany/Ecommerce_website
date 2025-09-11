import { Link } from 'react-router-dom'
import CategoryCarousel from './CategoryCarousel'

function GetTVs ()  {
  return (
    <>
      <div className='flex flex-col bg-[#f2f2f2] m-5 rounded-sm  px-4 py-4 pb-10'>
        <h1 className='text-black font-semibold text-xl'>Upto 80% off | TV's
           <span className='ml-5'><Link to={`category/TV`} className="text-blue-500 hover:border-b-1 hover:border-blue-500 text-sm">see all more offers</Link>
           </span></h1>
        {localStorage.getItem('token') && <CategoryCarousel category='TV'/>}
      </div>
    </>
  )
}

export default GetTVs
