import React from 'react'
import './style.scss'
import { jewelryItems } from "../../data/data"
// импортируем хук useCart из контекста корзины
import { CartProvider, useCart } from '../../context/CartProvider/CartProvider';


export default function ItemCard({ item, onClick, showAddToCartButton = false }) {

    //добавление в корзину
    const { addToCart } = useCart();
    //если нет айтема - не рендерим
    if (!item) return null;

    //цена с учетом скидки
    const discountedPrice = typeof item.discount === 'number' && item.discount > 0
        ? Math.round(item.price - (item.price * item.discount / 100))
        : null;

    return (
        //по клику вызывается функция карточки с айди товара
        <div className='out__item' onClick={() => onClick(item.id)}>
            <img className='img out__img' src={item.imageUrl} alt={item.name} />
            <h3 className='title out__title'>{item.name}</h3>

            <h4 className={`price out__price ${discountedPrice ? 'out__price-old' : ''}`}>
                ${discountedPrice ?? item.price}

                {discountedPrice && (
                    <span className='sale out__sale red'>
                        ${item.price}
                    </span>
                )}
            </h4>

            {/* если флаг showAddToCartButton === true — показываем кнопку */}
            {showAddToCartButton && (
                <div className="cart">
                    <button
                        className='btn cart__btn'
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item);
                        }}
                    >
                        add to cart
                    </button>
                </div>
            )}
        </div>
    );
}
