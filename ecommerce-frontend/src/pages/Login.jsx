import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const navigate = useNavigate();
    const onLoginSubmission = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://ecommerce-website-1-huv1.onrender.com/api/ecommerce_clone/login", {
        email,
        password,
      },{
        withCredentials: true
      });

      const { token, user } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const decoded = jwtDecode(token);
      const timeOut = decoded.exp * 1000 - Date.now();

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cartItems");
        alert("Session expired, please login again");
        navigate("/login");
      }, timeOut);

      navigate("/"); 
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) alert("User not Found");
        else if (error.response.status === 401) alert("Incorrect Password");
        else alert(error.response.data.message || "Login Failed");
      } else {
        alert("Login Failed. Please try again");
        console.error("Login error:", error);
      }
    }
  
    }
    return (

        <>
            <div className='flex flex-col items-center m-auto bg-[#ffff] py-10'>
                <div className='flex pb-5 items-center'>
                    <img src="https://www.pngmart.com/files/23/Amazon-Logo-White-PNG-Clipart.png" alt="amazon" className='w-50' />
                    <span className='text-black text-2xl -translate-y-2'>.in</span>
                </div>

                <div className='border-gray-400 border px-6 py-4 w-100 '>
                    <form onSubmit={onLoginSubmission}>
                        <h2 className='text-black font-medium text-2xl' >Sign in or Create Account</h2>
                        <div className='flex flex-col px-2 py-4 space-y-1'>
                            <label className='text-black text-l' >Mobile Number or Email</label>
                            <input type="text" placeholder='First and last name' value={email} className='text-gray-800 text-sm h-[40px] px-2 border-gray-400 border-2 rounded-sm hover:border-blue-400 outline-0 hover:border-4'
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className='flex flex-col px-2 py-2 space-y-1'>
                            <label className='text-black text-sm'>Password</label>
                            <input type="password" placeholder='At least 6 characters' value={password} className='text-gray-800 text-sm h-[40px] px-2 border-gray-400 border-2 rounded-sm hover:border-blue-400 outline-0 hover:border-4'
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='px-2 py-2 items-center '>
                            <button type='submit' className='bg-yellow-400 text-sm text-black font-normal w-full p-2 rounded-2xl hover:bg-yellow-300'>Login</button>
                        </div>

                    </form>
                    <div className=' flex  justify-center'>
                        <p className='text-black'>or</p>
                    </div>

                    <div className='px-2 py-2 items-center '>
                        <button className='bg-yellow-400 text-sm  text-black font-normal w-full p-2 rounded-2xl hover:bg-yellow-300' type='click' onClick={() => navigate('/register')}>Register</button>
                    </div>
                    <p className='text-[12px] mt-5'>By creating an account or logging in, you agree to Amazon’s <span ><a className='text-blue-400 border-b-1 cursor-pointer hover:text-gray-700'>Conditions of Use</a></span > and <span ><a className='text-blue-400 border-b-1 hover:text-gray-700 cursor-pointer '>Privacy Policy</a></span>.</p>
                    <hr className='text-gray-400 mt-3 mb-5' />
                    <p className='text-black text-l font-medium'>Buying for work?</p>
                    <Link to='/login' className='text-blue-400 text-sm hover:border-b-1'>Create a free business account</Link>
                </div>

            </div>
        </>
    )
}

export default Login
