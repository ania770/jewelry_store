import React from 'react'
import './style.scss'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ItemCard from '../../components/ItemCard/ItemCard';
import { Link, useParams } from 'react-router-dom';
import { jewelryItems, bannerJewelryItems } from '../../data/data';
import { useState } from 'react';


export default function Product() {

    //айди из юрл
    const { id } = useParams();

    //поиск по айди в списке и баннере
    const item =
        jewelryItems.find(el => el.id === Number(id)) ||
        bannerJewelryItems.find(el => el.id === Number(id));

    //доп описание
    const [isExpanded, setIsExpanded] = useState(false);

    //раскрытие доп описания
    const handleViewMore = () => {
        setIsExpanded(true);
    };

    //если товар не найден
    if (!item) {
        return <div>Product not found</div>;
    }


    return (
        <div>
            <Header />
            <section className='product'>
                <Link to='/shop'><button className='product__back'>Back to shop</button></Link>
                <div className="container product__container">


                    <ItemCard item={item}
                        showAddToCartButton={true}
                        onClick={() => { }} />

                    <div className={`product__info ${isExpanded ? 'product__info-more' : ''}`}>
                        <h2 className='product__info-title'>Description</h2>
                        <p className='product__info-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quod ea cupiditate, id expedita, voluptatibus sapiente labore ad rem nulla dolore quisquam et officiis necessitatibus laudantium maxime dicta quia iure molestiae ducimus exercitationem placeat. Ab quos quasi natus rem exercitationem provident nam ex dolores alias earum. Impedit quaerat tempora incidunt.</p>
                        <button className='product__info-btn--view' onClick={handleViewMore}>View more</button>
                    </div>
                </div>

            </section>
            <Footer />
        </div>
    )
}
