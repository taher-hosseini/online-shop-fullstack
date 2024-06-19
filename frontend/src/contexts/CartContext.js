import React, { createContext, useState, useEffect } from 'react';

// ایجاد CartContext
export const CartContext = createContext();

const CartProvider = ({ children }) => {
    // const [cart, setCart] = useState([]);
    const [cart, setCart] = useState(() => {
        // Get the cart from localStorage
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    useEffect(() => {
        // Save the cart to localStorage whenever it changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // افزودن کالا به سبد خرید
    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // افزایش تعداد کالا
    const increaseQuantity = (productId) => {
        setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
    };

    // کاهش تعداد کالا
    const decreaseQuantity = (productId) => {
        const product = cart.find(item => item.id === productId);
        if (product.quantity === 1) {
            removeFromCart(productId);
        } else {
            setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item));
        }
    };

    // حذف کالا از سبد خرید
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    // حذف همه کالاها از سبد خرید
    const clearCart = () => {
        setCart([]);
    };

    // محاسبه مجموع قیمت سبد خرید
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // پرداخت (تسویه حساب)
    const checkout = () => {
        // عملکرد پرداخت را اینجا اضافه کنید
        alert(`مجموع مبلغ پرداختی: ${getTotalPrice().toLocaleString('fa')} تومان`);
        clearCart();
    };

    return (
        <CartContext.Provider value={{
            cart,
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
