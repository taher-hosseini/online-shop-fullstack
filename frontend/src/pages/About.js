import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="about-content">
                            <h2 className="mb-4">درباره من</h2>
                            <p style={{textAlign: "justify"}}>
                                سلام! من طاهر حسینی نسب هستم، فارغ‌التحصیل کارشناسی ارشد در رشته مهندسی نرم‌افزار
                                با گرایش نرم‌افزار از دانشگاه مدنی آذربایجان. با عشق و علاقه فراوان به دنیای تکنولوژی
                                و برنامه‌نویسی وارد شدم و اکنون به عنوان یک توسعه‌دهنده فرانت‌اند وب فعالیت می‌کنم.
                            </p>
                            <p style={{textAlign: "justify"}}>
                                تخصص اصلی من کار با React است که به من این امکان را می‌دهد تا رابط‌های کاربری دینامیک و
                                تعاملی بسازم.
                                در کنار توانمندی‌های فنی، تلاش می‌کنم تا همواره به‌روز بمانم و از جدیدترین تکنولوژی‌ها و
                                روندهای روز دنیا بهره‌برداری کنم.
                                هدف من، ایجاد تجربه‌های کاربری بی‌نظیر و بهینه‌سازی عملکرد وب‌سایت‌هاست تا کاربران از
                                کار با آن‌ها لذت ببرند.
                            </p>
                            <p style={{textAlign: "justify"}}>
                                به دنبال فرصت‌هایی برای همکاری و مشارکت در پروژه‌های جدید هستم و همواره آماده‌ام تا با
                                خلاقیت و دقت بالا، بهترین‌ها را به ارمغان بیاورم.
                            </p>
                            <div className="social-links">
                                <a href="https://github.com/taher-hosseini" className="social-link github" target="_blank"
                                   rel="noopener noreferrer">
                                    <FaGithub/>
                                </a>
                                <a href="https://www.linkedin.com/in/taher-hosseini-nasab/" className="social-link linkedin"
                                   target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin/>
                                </a>
                                <a href="mailto:taherhossieninasab@gmail.com" className="social-link email">
                                    <FaEnvelope/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
