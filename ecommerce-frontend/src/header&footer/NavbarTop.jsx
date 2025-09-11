import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { BiCartAdd } from 'react-icons/bi';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import '../index.css'
import { CartContext } from '../context/CartContext';
import axios from 'axios';



function NavbarTop() {
  const [address, setAddress] = useState({ city: "Vijaywada", postalCode: "533124" });
  const user = JSON.parse(localStorage.getItem('user'));
  const { totalUnquieItems } = useContext(CartContext);
  const [searchProducts, setSearchProducts] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const userId = storedUser?.id;
        if (!userId) return console.error("No user ID is found in the local store");

        const response = await axios.get(`http://localhost:3004/api/ecommerce_clone/${userId}/address`,
          { headers: { Authorization: `Bearer ${token}` } });
        if (Array.isArray(response.data) && response.data.length > 0) {
          setAddress(response.data[0]);
        }
      } catch (error) {
        console.log("Error while fetching Address:", error);
      }
    }
    fetchAddress();
  }, []);

  const onSearching = async (e) => {
    e.preventDefault();
    const searchValue = searchProducts.trim().toLowerCase();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3004/api/ecommerce_clone/products/categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const categories = response.data;
      const matchedCategories = categories.filter((cat) => cat.toLowerCase().includes(searchValue));
      if (matchedCategories.length > 0) {
        if (matchedCategories.length === 1) {
          
          navigate(`/category/${matchedCategories[0]}`);
        } else {
         
          console.log("Multiple matches:", matchedCategories);
          alert(`Multiple categories found: ${matchedCategories.join(", ")}`);
          
        }
      } else {
        alert("No product is found with this name");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

      <nav className="bg-[#131921] w-full flex items-center px-3 py-2 gap-2 relative ">
        {/* Amazon Logo */}
        <Link className="flex items-center hover:border hover:border-white px-1.5 py-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="amazon"
            className="w-[100px] sm:w-[120px] object-contain"
          />
          <span className="text-white text-sm ml-[-5px]">.in</span>
        </Link>

        {/* Location */}
        <Link className="flex items-center hover:border hover:border-white px-1.5 py-2">
          <IoLocationOutline className="text-white text-2xl" />
          <div className="flex flex-col leading-tight ml-[-4px]">
            <span className="text-gray-400 text-[11px]">Deliver to</span>
            <span className="text-white font-semibold text-sm truncate max-w-[120px]">
              {user ? `${address.city}, ${address.postalCode}` : "Vijaywada, 5331234"}
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <form className="flex flex-1 mx-2 " onSubmit={onSearching}>
          <input
            type="text"
            className="flex-grow h-10 p-3 rounded-l-md text-sm md:text-xl text-white"
            placeholder="Search Amazon.in" value={searchProducts} onChange={(e) => setSearchProducts(e.target.value)}
          />
          <button
            type="submit"
            className="bg-orange-400 w-12 h-10 flex items-center justify-center rounded-r-md"
          >
            <FaSearch className="text-black text-lg" />
          </button>
        </form>

        {/* Language Selector */}
        <div className="relative hidden lg:block">
          <div className="group flex items-center gap-1 cursor-pointer hover:border hover:border-white px-1.5 py-2">
            <img src="https://flagcdn.com/in.svg" alt="flag" className="w-5 h-4" />
            <span className="text-white text-sm">EN</span>
            <MdOutlineArrowDropDown className="text-gray-400" />

            {/* Dropdown */}
            <div
              className="absolute left-0 top-full mt-1 w-[220px] rounded bg-white shadow-lg p-3
                   opacity-0 invisible group-hover:opacity-100 group-hover:visible
                   transition duration-200 ease-out z-[999]"
            >
              {["English-EN", "हिंदी-HI", "தமிழ்-TA", "తెలుగు-TE", "ಕನ್ನಡ-KA"].map((lang, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer py-1">
                  <input type="radio" name="lang" className="hidden peer" />
                  <span className="w-3 h-3 border-2 border-gray-400 rounded-full relative peer-checked:border-orange-500">
                    <span className="absolute inset-1 bg-orange-500 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </span>
                  <span className="text-sm text-gray-700 font-medium hover:text-orange-400">{lang}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Accounts & Lists */}
        <div className="relative hidden md:block">
          <div className="group px-1.5 py-2 cursor-pointer hover:border hover:border-white">
            <p className="text-white text-xs">Hello, {user ? user.name : "Sign in"}</p>
            <div className="flex items-center">
              <p className="text-white font-bold text-sm">Accounts & Lists</p>
              <MdOutlineArrowDropDown className="text-gray-400" />
            </div>

            {/* Dropdown */}
            <div
              className="absolute right-0 top-full mt-1 w-[420px] rounded bg-white shadow-2xl p-4
                   opacity-0 invisible group-hover:opacity-100 group-hover:visible
                   transition duration-200 ease-out z-[999]"
            >
              {!user ? (
                <>
                  <div className="flex justify-center pb-2">
                    <button className="bg-yellow-400 hover:bg-yellow-300 w-[200px] text-sm p-1 rounded">
                      Sign in
                    </button>
                  </div>
                  <div className="flex justify-center gap-1 text-xs pb-4">
                    <span>New customer?</span>
                    <a href="#" className="text-blue-600 hover:underline">Start here</a>
                  </div>
                </>
              ) : (
                <div className="bg-sky-100 px-3 py-2 rounded mb-3 flex justify-between items-center">
                  <p className="text-sm">Who is shopping? Select a profile.</p>
                  <div className="flex items-center text-blue-600 text-sm cursor-pointer">
                    Manage Profiles <MdOutlineKeyboardArrowRight />
                  </div>
                </div>
              )}

              {/* Two-column layout */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Your Lists</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="hover:underline cursor-pointer hover:text-red-500">Create a Wish List</li>
                    <li className="hover:underline cursor-pointer hover:text-red-500">Wish from any website</li>
                    <li className="hover:underline cursor-pointer hover:text-red-500">Baby Wishlist</li>
                    <li className="hover:underline cursor-pointer hover:text-red-500">Discover Your Style</li>
                    <li className="hover:underline cursor-pointer hover:text-red-500">Explore Showroom</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Your Account</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {[
                      "Your Account",
                      "Your Orders",
                      "Your Wishlist",
                      "Your Recommendations",
                      "Your Prime Membership",
                      "Your Prime Video",
                      "Your Subscribe & Save Items",
                      "Membership & Subscriptions",
                    ].map((item, i) => (
                      <li key={i} className="hover:underline cursor-pointer hover:text-red-500">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Returns */}
        <Link to='/orders' className="hover:border hover:border-white px-1.5 py-2 hidden sm:block">
          <p className="text-white text-xs">Returns</p>
          <p className="text-white font-bold text-sm">& Orders</p>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="flex items-center hover:border hover:border-white px-1.5 py-2">
          <div className="relative">
            <BiCartAdd className="text-white text-3xl" />
            <span className="absolute -top-4 left-3 text-orange-400 font-bold">
              {user ? totalUnquieItems : "0"}
            </span>
          </div>
          <span className="text-white font-bold ml-1 hidden sm:block">Cart</span>
        </Link>
      </nav>
    </>
  )
}

export default NavbarTop




