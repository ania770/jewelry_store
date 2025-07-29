
import React from 'react';
import { useCart } from '../../context/CartProvider/CartProvider';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import './style.scss'

export default function Bag() {
    // Достаём из контекста корзины все нужные функции и данные
    const {
        cartItems,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        getTotalPrice
    } = useCart();

    return (
        <>
            <Header />
            <section className='bag'>
                <div className="bag__container">
                    <h2 className='bag__title'>Shopping cart</h2>
                    {cartItems.length === 0 ? (
                        <p className='bag__empty'>Cart is empty</p>
                    ) : (
                        <>
                            <ul className='bag__list'>
                                {cartItems.map(item => (
                                    <li className=' bag__list-item' key={item.id}>
                                        <div className="bag__list-img--content">
                                            <img className='bag__list-img' src={item.imageUrl} alt={item.name} />
                                        </div>
                                        <div className="bag__list-info">
                                            <h3 className='bag__list-name'>{item.name}</h3>
                                            <h4 className='bag__list-text'>{item.alloy}/{item.category}</h4>
                                            <h4 className='bag__list-price'>  ${item.price}</h4>
                                            <div className="bag__list-quantity">
                                                <button className='bag__minus' onClick={() => decrementQuantity(item.id)}>-</button>
                                                <span> {item.quantity}</span>
                                                <button className='bag__plus' onClick={() => incrementQuantity(item.id)}>+</button>
                                            </div>
                                        </div>
                                        <div className="bag__btn-content">
                                            <button className='bag__btn' onClick={() => removeFromCart(item.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                                    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
                                                </svg>
                                            </button>
                                        </div>

                                    </li>
                                ))}
                            </ul>

                        </>
                    )}
                </div>
                <div className="bag__total">
                    <h3 className='bag__total-text'>Total: ${getTotalPrice()}</h3>
                    <Link to='/shipping'> <button className='bag__total-btn'>Buy now</button></Link>

                </div>
            </section>
            <Footer />
        </>
    );
}

