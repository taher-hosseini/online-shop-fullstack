import React, { useContext } from 'react';
import './ProductList.css';
import { ProductContext } from '../contexts/ProductContext';
import { CartContext } from '../contexts/CartContext';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../contexts/AuthContext";

const ProductList = () => {
    const { productList, selectedCategory } = useContext(ProductContext);
    const { isLoggedIn } = useContext(AuthContext);
    const { cart, setCart,addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    const filteredProductList = !selectedCategory || selectedCategory==='همه'
        ? productList
        : productList.filter(product => product.category === selectedCategory);
    const handleAddToCart = (product) => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            addToCart(product)
        }
    }

    return (
        <>
            <div className='row g-3'>
                {filteredProductList.map((product) => (
                    <div className='col-12 col-md-6 col-lg-4 content-wrapper' key={product.id}>
                        <div className='content-item'>
                            <Link to={`/product/${product.id}`}>
                                <img className='content-img' src={product.images[0]} alt={product.name} />
                            </Link>
                            <div className='content-main'>
                                <p className='content-main-title'>{product.name}</p>
                                <p className='content-main-description'>
                                    {truncateText(product.description, 50)}{' '}
                                    <Link to={`/product/${product.id}`} className="read-more">ادامه مطلب</Link>
                                </p>
                            </div>
                            <div className='flex-md-row flex-lg-column-reverse flex-xl-row content-footer'>
                                <button type="submit" className='btn-grad' onClick={() => handleAddToCart(product)}>خرید</button>
                                <div className='content-footer-price'>
                                    <span className='content-footer-price-caption'>قیمت</span>
                                    <span><span className='me-1'>{product.price.toLocaleString('fa')}</span>تومان</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductList;
