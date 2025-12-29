import React, { useRef, useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { RxHamburgerMenu } from "react-icons/rx";
import prime_girl from '../assets/prime_girl.png'
import { FaUserCircle } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import '../index.css'

function NavbarMain() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(null);
  const isLoggedIn=!!localStorage.getItem('token');
  const user=JSON.parse(localStorage.getItem('user'));
  const navigate=useNavigate();
  const navLinks = [
    { name: "Fresh", to: "/fresh" },
    { name: "MX Player", to: "/mx-player" },
    { name: "Sell", to: "/sell" },
    { name: "Bestsellers", to: "/bestsellers" },
    { name: "Today's Deals", to: "/deals" },
    { name: "Mobiles", to: "/mobiles" },
    { name: "Prime", to: "/prime" },
    { name: "Fashion", to: "/fashion" },
    { name: "Customer Service", to: "/support" },
    { name: "New Releases", to: "/new-releases" },
    { name: "Home & Kitchen", to: "/home-kitchen" },
    { name: "Electronics", to: "/electronics" },
    { name: "Amazon Pay", to: "/amazon-pay" },
    { name: "Computers", to: "/computers" },
    { name: "Books", to: "/books" },
    { name: "Car & Motorbike", to: "/automotive" },
  ];
  const digitalContents = [
    { name: "Echo & Alexa", to: "/alexa" },
    { name: "Fire Tv", to: "/fire_tv" },
    { name: "Kindle E-Readers & eBooks", to: "/ebooks" },
    { name: "Audible Audiobooks", to: "/audiobooks" },
    { name: "Amazon Prime Video", to: "/prime_video" },
    { name: "Amazon Prime Music", to: "/prime_music" },
  ];
  const shopByCategory = [
    { name: "Mobiles,Computers", to: "/mobiles_computers" },
    { name: "Tv,Appliances,Electronics", to: "/electronics" },
    { name: "Men's Fashion", to: "/mens_fashion" },
    { name: "Mobiles,Computers", to: "/mobiles_computers" },
  ];
  const programsAndFeatures = [
    { name: "Amazon Pay", to: "/amazon_pay" },
    { name: "Gift cards & Mobile Recharges", to: "/mobile_recharge" },
    { name: "Amazon Launchpad", to: "/launchpad" },
    { name: "Amazon Business", to: "/amazon_business" },
  ];
  const settings = [
    { name: "Your Account", to: "/your_account" },
    { name: "Customer Service", to: "/Customer_service" },
  ];
   const handleAuthClick=(e)=>{
    e.preventDefault();
    if(isLoggedIn) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('cartItems');
    } 
    navigate('/login');
   }
  useEffect(() => {
    const handle = (e) => !openRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);
 
  return (
    <>
      <nav className='bg-[#232F3E] bg-cover flex  pt-3 pr-2 pl-3 pb-2  w-full z-100'>
         <div className='relative z-50' ref={openRef}>
      
      <button
        className='border border-white hover:p-1 flex gap-1.5 p-1'
        onClick={() => setOpen(true)}
      >
        <RxHamburgerMenu className='text-white font-bold text-2xl' />
        <span className='text-white font-[700]'>All</span>
      </button>

      
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-in fade-in duration-300"
          onClick={() => setOpen(false)}
        ></div>
      )}

      
      <div
        className={`fixed top-0 left-0 h-screen w-[300px] z-50 bg-white shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out 
          ${open ? "translate-x-0 animate-in slide-in-from-left" : "-translate-x-full"}`}
      >
        
        <div className="bg-gray-700 flex justify-between items-center px-5 py-3">
          <div className='flex gap-3 items-center'>
            <FaUserCircle className='text-white text-2xl' />
            <h1 className="font-bold text-white text-l">Hello, {isLoggedIn ? user?.name : 'sign in'}</h1>
          </div>
          <RxCross2
            className='w-6 h-6 text-white hover:text-gray-300 cursor-pointer'
            onClick={() => setOpen(false)}
          />
        </div>

        
        <div className="flex flex-col space-y-6 px-2 py-4">

         
          <div>
            <h1 className='text-gray-700 font-[700] text-l px-4'>Trending</h1>
            {["Bestsellers", "New Releases", "Movers and Shakers"].map((item, i) => (
              <p key={i} className='px-4 py-2 hover:bg-gray-100 text-gray-600 text-sm cursor-pointer'>
                <a href="#">{item}</a>
              </p>
            ))}
          </div>
          <hr className='border-gray-300' />

          <div>
            <h1 className='text-gray-700 font-[700] text-l px-4'>Digital Content and Devices</h1>
            {digitalContents.map((each, i) => (
              <div key={i} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link to={each.to} className='text-gray-600 text-sm'>{each.name}
                {each.isButton}
                </Link>
                <FaAngleRight className='text-gray-500 text-sm' />
              </div>
            ))}
          </div>
          <hr className='border-gray-300' />

          
          <div>
            <h1 className='text-gray-700 font-[700] text-l px-4'>Shop By Category</h1>
            {shopByCategory.map((each, i) => (
              <div key={i} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link to={each.to} className='text-gray-600 text-sm'>{each.name}</Link>
                <FaAngleRight className='text-gray-500 text-sm' />
              </div>
            ))}
          </div>
          <hr className='border-gray-300' />

          <div>
            <h1 className='text-gray-700 font-[700] text-l px-4'>Programs & Features</h1>
            {programsAndFeatures.map((each, i) => (
              <div key={i} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link to={each.to} className='text-gray-600 text-sm'>{each.name}</Link>
                <FaAngleRight className='text-gray-500 text-sm' />
              </div>
            ))}
          </div>
          <hr className='border-gray-300' />

        
          <div>
            <h1 className='text-gray-700 font-[700] text-l px-4'>Help & Settings</h1>
            {settings.map((each, i) => (
              <div key={i} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link to={each.to} className='text-gray-600 text-sm'>{each.name}</Link>  
                <FaAngleRight className='text-gray-500 text-sm' />
              </div>
            ))}
              <div  className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link to='/login' className='text-gray-600 text-sm' onClick={handleAuthClick}>
                 {isLoggedIn? 'Sign Out': 'Sign In'}
                </Link>  
                <FaAngleRight className='text-gray-500 text-sm' />
              </div>
          </div>
        </div>
      </div>
    </div>


    <div className="flex flex-nowrap overflow-hidden relative">
  {navLinks.map((item, i) => (
    <div
      key={i}
      className="hover:border hover:border-white flex items-center ml-5 hover:p-1 relative group cursor-pointer"
    >
      
      <span className="text-white font-[600] text-[14px] flex gap-1 items-center">
        {item.name}
        {item.name === "Prime" && (
          <MdOutlineArrowDropDown className="text-gray-300" />
        )}
      </span>

      
      {item.name === "Prime" && (
        <div className="bg-white hidden absolute group-hover:block p-4 top-full left-0 z-50  shadow-2xl h-[400px] w-[400px] overflow-visible">
          <div className="flex items-center flex-col p-2 mb-4">
            <h1 className="text-black font-bold text-3xl mb-2">
              Shopping Plans <br />
              <span className="flex-start">Starting at 399/year</span>
            </h1>
            <p className="text-gray-700">
              Get FREE same/1-day delivery, Prime offers & more
            </p>
          </div>
          <div className="flex bg-blue-400 p-1 items-center w-full mb-2 justify-center  h-[200px]">
            <img src={prime_girl} alt="prime" className="w-[250px]" />
          </div>
          <div className="flex items-center">
            <Link
              to="/prime"
              className="mt-2 mb-2 items-center border border-yellow-400 w-full text-center text-black font-[400] p-2 bg-yellow-400 rounded-xl"
            >
              Join Prime now
            </Link>
          </div>
        </div>
      )}
    </div>
  ))}
</div>






      </nav>
    </>
  )
}

export default NavbarMain
