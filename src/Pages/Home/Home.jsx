import React from 'react';
import { bannerJewelryItems, jewelryItems } from "../../data/data";
import './style.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import ItemList from '../../components/ItemList/ItemList';
import useItemClick from '../../hooks/useItemClick';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

export default function Home() {

    // Хук для программной навигации по страницам
    const navigate = useNavigate();
    // Кастомный хук для обработки клика по товару
    const handleItemClick = useItemClick();

    return (
        <>
            <Header />
            <div className='home'>

                <section className='home__banner'>
                    <Swiper
                        pagination={{ dynamicBullets: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper"
                    >
                        {bannerJewelryItems.map((item) => (
                            <SwiperSlide key={item.key}>
                                <div className='home__banner-container'>
                                    <img className='home__banner-img' src={item.imageUrl} alt={item.name} />
                                    <div className="home__banner-text-content">
                                        <h1 className='home__banner-title'>{item.name}</h1>
                                        <h2 className={`home__banner-price ${item.discount ? 'red' : ''}`}>${item.price}</h2>
                                        {item.discount && (
                                            <span className='home__banner-sale'>
                                                ${Math.round(item.price - (item.price * item.discount / 100))}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        className='home__banner-btn'
                                        onClick={() => navigate(`/product/${item.id}`)}
                                    >
                                        See more
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>

                <section className='home__out'>
                    <div className="home__out-subtitle-content">
                        <h2 className='home__out-subtitle'>Shop The Latest</h2>
                        <Link to='/shop'>
                            <button className='home__out-btn'>View all</button>
                        </Link>
                    </div>
                    <div className="home__out-container">
                        <ItemList items={jewelryItems} onItemClick={handleItemClick} />
                    </div>
                </section>


            </div>
            <Footer />
        </>
    );
}
