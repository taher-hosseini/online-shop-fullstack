import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const increaseQuantity = (productId) => {
        setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decreaseQuantity = (productId) => {
        const product = cart.find(item => item.id === productId);
        if (product.quantity === 1) {
            removeFromCart(productId);
        } else {
            setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item));
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const checkout = () => {
        alert(`مجموع مبلغ پرداختی: ${getTotalPrice().toLocaleString('fa')} تومان`);
        clearCart();
    };

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            clearCart,
            getTotalPrice,
            checkout
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
