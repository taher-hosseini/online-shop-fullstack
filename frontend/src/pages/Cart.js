import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, getTotalPrice, checkout } = useContext(CartContext);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">سبد خرید</h2>
            {cart.length === 0 ? (
                <p>سبد خرید خالی است.</p>
            ) : (
                <div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">تصویر</th>
                            <th scope="col">نام محصول</th>
                            <th scope="col">قیمت</th>
                            <th scope="col">تعداد</th>
                            <th scope="col">عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.map(item => (
                            <tr key={item.id}>
                                <td><img src={item.images[0]} alt={item.name} className="img-thumbnail" style={{width: '100px',height:'100px'}}/></td>
                                <td>{item.name}</td>
                                <td>{item.price.toLocaleString('fa')} تومان</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <div className="rounded-5">
                                        <button type="button" className="btn btn-secondary btn-sm"
                                                onClick={() => increaseQuantity(item.id)}>+
                                        </button>
                                        <button type="button" className="btn btn-secondary btn-sm ms-1"
                                                onClick={() => decreaseQuantity(item.id)}>-
                                        </button>
                                        <button type="button" className="btn btn-danger btn-sm ms-4"
                                                onClick={() => removeFromCart(item.id)}>حذف
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                    <h3>مجموع: {getTotalPrice().toLocaleString('fa')} تومان</h3>
                        <div className="rounded-5">
                            <button type="button" className="btn btn-success" onClick={checkout}>پرداخت</button>
                            <button type="button" className="btn btn-danger ms-3" onClick={clearCart}>حذف همه</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
