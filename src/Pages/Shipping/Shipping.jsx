import React, { useState } from 'react';
import './style.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

export default function Shipping() {

    // Состояние для данных формы доставки и оплаты
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        cardNumber: '',
        exp: '',
        ccv: ''
    });


    // Функция обработки изменений в полях ввода
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    //проверка поля для изменения лейбла
    const isActive = (name) => formData[name].length > 0;

    // Обработчик отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();

        // Выводим данные в консоль
        console.log('Submitted shipping data:', formData);

        // Сброс формы
        setFormData({
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            cardNumber: '',
            exp: '',
            ccv: ''
        });
    };

    return (
        <div>
            <Header />
            <div className="shipping">
                <form className="shipping__form" onSubmit={handleSubmit}>
                    <h1 className="shipping__title">Shipping Details</h1>

                    <div className="shipping__name-group">
                        {['firstName', 'lastName'].map((field, i) => (
                            <div className="shipping__field" key={i}>
                                <label
                                    className={`shipping__label ${isActive(field) ? 'shipping__label--top' : ''}`}
                                    htmlFor={field}
                                >
                                    {field === 'firstName' ? 'First' : 'Last'}
                                </label>
                                <input
                                    className="shipping__input"
                                    type="text"
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="shipping__field">
                        <label className={`shipping__label ${isActive('street') ? 'shipping__label--top' : ''}`} htmlFor="street">Street</label>
                        <input className="shipping__input" type="text" id="street" name="street" value={formData.street} onChange={handleChange} />
                    </div>

                    <div className="shipping__address-info">
                        {['city', 'state', 'zip'].map((field, i) => (
                            <div className="shipping__field" key={i}>
                                <label
                                    className={`shipping__label ${isActive(field) ? 'shipping__label--top' : ''}`}
                                    htmlFor={field}
                                >
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <input
                                    className="shipping__input"
                                    type="text"
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                    </div>

                    <h1 className="shipping__title">Payment Information</h1>

                    <div className="shipping__field">
                        <label className={`shipping__label ${isActive('cardNumber') ? 'shipping__label--top' : ''}`} htmlFor="cardNumber">Credit Card No.</label>
                        <input className="shipping__input" type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} />
                    </div>

                    <div className="shipping__cc-info">
                        {['exp', 'ccv'].map((field, i) => (
                            <div className="shipping__field" key={i}>
                                <label
                                    className={`shipping__label ${isActive(field) ? 'shipping__label--top' : ''}`}
                                    htmlFor={field}
                                >
                                    {field.toUpperCase()}
                                </label>
                                <input
                                    className="shipping__input"
                                    type="text"
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="shipping__buttons">
                        <button className="shipping__button" type="submit">Purchase</button>
                        <Link to="/bag">
                            <button className="shipping__button shipping__button--secondary" type="button">Back to Cart</button>
                        </Link>
                    </div>
                </form>


            </div>
            <Footer />
        </div>
    );
}
