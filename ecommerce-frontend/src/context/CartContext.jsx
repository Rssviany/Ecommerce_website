import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cartItems');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems]);


    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item._id === product._id);

            if (existing) {
                return prev.map((item) => {
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                });
            } else {
                return [...prev, { ...product, quantity: 1 }]
            }
        });
    }
    const updateQuantity = (id, newQty) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, quantity: Math.max(newQty, 1) } : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
    }

    const isInCart = (id) => {
        return cartItems.some((item) => item._id === id);
    }
    const cartTotal = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const totalUnquieItems=cartItems.length;


    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isInCart, updateQuantity, cartTotal,totalUnquieItems }}>
            {children}
        </CartContext.Provider>
    );

};