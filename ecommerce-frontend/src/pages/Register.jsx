import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'



function Register() {
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const navigate = useNavigate();

    const onSubmitHandle = async (e) => {
        if (!email.includes('@')) return alert('Enter a valid email');
        e.preventDefault();
        try {
            await axios.post('http://localhost:3004/api/ecommerce_clone/register', {
                userName, email, password, phoneNumber
            });
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            } else {
                alert('Registration failed. Please try again');
                console.error('Registration failed:', error);
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

                <div className='border-gray-400 border-1 px-6 py-4 w-[400px] '>
                    <form onSubmit={onSubmitHandle}>
                        <h2 className='text-black font-medium text-2xl' >Create Account</h2>
                        <div className='flex flex-col px-2 py-4 space-y-1'>
                            <label className='text-black text-l' >Mobile Number</label>
                            <input type="text" placeholder='Your Phone number' value={phoneNumber} className='text-gray-800 text-sm h-[40px] px-2 border-gray-400 border-2 rounded-sm hover:border-blue-400 outline-0 hover:border-4'
                                onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div className='flex flex-col px-2 py-4 space-y-1'>
                            <label className='text-black text-l' >Your name</label>
                            <input type="text" placeholder='First and last name' value={userName} className='text-gray-800 text-sm h-[40px] px-2 border-gray-400 border-2 rounded-sm hover:border-blue-400 outline-0 hover:border-4'
                                onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className='flex flex-col px-2 py-2 space-y-1'>
                            <label className='text-black text-sm'>E-mail</label>
                            <input type="text" placeholder='Your email id' value={email} className='text-gray-800 text-sm h-[40px] px-2 border-gray-400 border-2 rounded-sm hover:border-blue-400 outline-0 hover:border-4'
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='flex flex-col px-2 py-2 space-y-1'>
                            <label className='text-black text-sm'>Password</label>
                            <input type="password" placeholder='At least 6 characters' value={password} className='text-gray-800 text-sm h-[40px] px-2 border-gray-400 border-2 rounded-sm hover:border-blue-400 outline-0 hover:border-4'
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='px-2 py-2 items-center '>
                            <button type='submit' className='bg-yellow-400 text-sm text-black font-normal w-full p-2 rounded-2xl hover:bg-yellow-300'>Create your Amazon account</button>
                        </div>

                    </form>
                    <hr className='text-gray-400 mt-5 mb-5' />
                    <p className='text-black text-l font-medium'>Already a customer?</p>
                    <Link to='/login' className='text-blue-400 text-sm hover:border-b-1'>Sign in instead</Link>
                    <hr className='text-gray-400 mt-3 mb-5' />
                    <p className='text-black text-l font-medium'>Buying for work?</p>
                    <Link to='/login' className='text-blue-400 text-sm hover:border-b-1'>Create a free business account</Link>
                    <p className='text-[12px] mt-5'>By creating an account or logging in, you agree to Amazon’s <span ><a className='text-blue-400 border-b-1 cursor-pointer hover:text-gray-700'>Conditions of Use</a></span > and <span ><a className='text-blue-400 border-b-1 hover:text-gray-700 cursor-pointer '>Privacy Policy</a></span>.</p>
                </div>

            </div>

        </>
    )
}

export default Register
