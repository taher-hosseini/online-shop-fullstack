import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [productList, setProductList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || null);

    useEffect(() => {
        if (selectedCategory) {
            localStorage.setItem('selectedCategory', selectedCategory);
        }
    }, [selectedCategory]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const response = await axios.get('http://localhost:5000/items');
                const response = await axios.get('https://online-shop-fullstack-server.vercel.app/items');
                setProductList(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [productList]);


    return (
        <ProductContext.Provider value={{ productList, selectedCategory, setSelectedCategory }}>
            {children}
        </ProductContext.Provider>
    );
};





// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
//
// export const ProductContext = createContext();
//
// export const ProductProvider = ({ children }) => {
//     const [productList, setProductList] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || null);
//
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 // const response = await axios.get('http://localhost:5000/items');
//                 const response = await axios.get('https://online-shop-fullstack.vercel.app/items');
//                 setProductList(response.data);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };
//
//         fetchProducts();
//     }, [productList]);
//
//     useEffect(() => {
//         if (selectedCategory) {
//             localStorage.setItem('selectedCategory', selectedCategory);
//         }
//     }, [selectedCategory]);
//
//     return (
//         <ProductContext.Provider value={{ productList, selectedCategory, setSelectedCategory }}>
//             {children}
//         </ProductContext.Provider>
//     );
// };
