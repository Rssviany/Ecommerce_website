import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom';
import { FiMinus } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";

function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);

    const navigate = useNavigate();
    if (cartItems.length === 0) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-xl font-bold">Your cart is empty 🛒</h2>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Go Shopping
                </button>
            </div>
        )
    };
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.map((item) => (
                <div
                    key={item._id}
                    className="flex items-center justify-between border-b py-4"
                >
                    <div className="flex items-center">
                        <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-40 h-40 object-cover rounded-lg"
                        />
                        <div className="ml-4 flex flex-col">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-600">₹{item.price}</p>
                            <span className='text-green-500'>{item.inStock ? 'In stock' : 'Unavailable'}</span>
                            <div className='border-3 border-yellow-300 flex items-center justify-between px-1 py-1 w-20 rounded-2xl'>
                                <FiMinus className='text-black text-l' onClick={() => updateQuantity(item._id, item.quantity - 1)} />
                                <span className='text-black text-l'>{item.quantity}</span>
                                <IoAddSharp className='text-black text-l' onClick={() => updateQuantity(item._id, item.quantity + 1)} />
                            </div>
                            <span
                                onClick={() => removeFromCart(item._id)}
                                className=" text-blue-500 text-sm cursor-pointer">
                                Delete
                            </span>
                        </div>
                    </div>

                </div>
            ))}

            <div className="mt-6 flex justify-end">
                <h2 className="px-6 py-2 bg-green-500 text-white rounded-lg">
                    Total:{Math.ceil(cartTotal)}
                </h2>
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => navigate("/checkout")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Proceed to Checkout
                </button>
            </div>

        </div>
    )
}

export default CartPage
