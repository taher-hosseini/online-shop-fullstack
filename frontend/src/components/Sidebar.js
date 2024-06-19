import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faDoorOpen, faCogs, faUsers, faBuilding, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { TbCategoryPlus } from "react-icons/tb";
import './Sidebar.css'

import { ProductContext } from '../contexts/ProductContext';

const Sidebar = () => {
    const { productList, selectedCategory, setSelectedCategory } = useContext(ProductContext);
    const categories = ['همه',...new Set(productList.map(product => product.category))];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
    useEffect(() => {
        if(selectedCategory === null){
            setSelectedCategory("همه")
        }
    }, []);

    return (
        <aside className="side-content">
            <div className='sidebar'>
                <p><TbCategoryPlus/>دسته بندی</p>
                <ul>
                    {categories.map((category, index) => (
                        <li key={index} className={selectedCategory === category ? 'active' : ''}
                            onClick={() => handleCategoryClick(category)}>
                            <Link>
                                {category}
                            </Link>
                        </li>

                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
