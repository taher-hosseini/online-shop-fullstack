// src/pages/ProductPageMoreInfo.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from "../contexts/ProductContext";
import { AuthContext } from "../contexts/AuthContext";
import './ProductPageMoreInfo.css';
import {CartContext} from "../contexts/CartContext";

const ProductPageMoreInfo = () => {
    const { productList } = useContext(ProductContext);
    const { isLoggedIn } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const { cart, setCart,addToCart } = useContext(CartContext);

    useEffect(() => {
        const foundProduct = productList.find(product => product.id === parseInt(id));
        setProduct(foundProduct);
        setSelectedImage(foundProduct?.images[0]);
    }, [id, productList]);

    const handlePurchase = () => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            addToCart(product)
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className='row flex-column-reverse flex-lg-row ProductPage-container'>
            <div className='col-12 col-lg-6 mt-2 mt-lg-0 ProductPage-right'>
                <div className='ProductPage-content-main'>
                    <p className='ProductPage-content-main-title'>{product.name}</p>
                    <p className='ProductPage-content-main-description'>{product.description}</p>
                </div>
                <div className='ProductPage-content-footer'>
                    <button type="button" className='btn-grad' onClick={handlePurchase}>خرید</button>
                    <div className='ProductPage-content-footer-price'>
                        <span className='ProductPage-content-footer-price-caption'>قیمت</span>
                        <span><span className='me-1'>{product.price.toLocaleString('fa')}</span>تومان</span>
                    </div>
                </div>
            </div>
            <div className='col-12 col-lg-6 ProductPage-left'>
                <img className='ProductPage-main-img' src={selectedImage} alt={product.name} />
                <div className='ProductPage-thumbnails'>
                    {product.images.map((image, index) => (
                        <img
                            key={index}
                            className={`ProductPage-thumbnail ${selectedImage === image ? 'selected' : ''}`}
                            src={image}
                            alt={`thumbnail-${index}`}
                            onClick={() => setSelectedImage(image)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPageMoreInfo;
