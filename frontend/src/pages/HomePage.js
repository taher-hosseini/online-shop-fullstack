import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faHandshake, faSyncAlt, faTag } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
    return (
        <div className="home-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div className="feature">
                            <FontAwesomeIcon icon={faTruck} size="3x" style={{ color: '#007bff' }}/>
                            <h3>ارسال پستی سریع</h3>
                            <p>سفارش شما به سرعت به دست شما خواهد رسید.</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div className="feature">
                            <FontAwesomeIcon icon={faHandshake} size="3x" style={{ color: '#007bff' }}/>
                            <h3>ضمانت کالا</h3>
                            <p>تضمین کیفیت و مطابقت کامل کالا با توضیحات و عکس‌ها.</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div className="feature">
                            <FontAwesomeIcon icon={faSyncAlt} size="3x" style={{ color: '#007bff' }}/>
                            <h3>قابلیت تعویض کالا</h3>
                            <p>امکان تعویض و بازگشت کالا در صورت عدم رضایت شما.</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div className="feature">
                            <FontAwesomeIcon icon={faTag} size="3x" style={{ color: '#007bff' }} />
                            <h3>قیمت مناسب</h3>
                            <p>ما قیمت‌هایی را با توجه به بودجه‌ی شما پیشنهاد می‌دهیم.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-lg-8 text-center">
                        <h1 className="mb-4">خوش آمدید به فروشگاه ما!</h1>
                        <p className="lead mb-4">
                            با ما از خرید آسان و امن لذت ببرید. ما بهترین کیفیت را با قیمت‌های مناسب، ارسال سریع و ضمانت بازگشت کالا به شما ارائه می‌دهیم.
                        </p>
                        <Link to="/products" className="btn btn-primary btn-lg mt-4">مشاهده محصولات</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
