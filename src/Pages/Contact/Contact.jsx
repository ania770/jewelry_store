import React, { useState } from 'react';
import './style.scss'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

//переписать инпуты на ипуты из контакта 

export default function Contact() {
    //состояние для хранения общей формы ( из локалсторадж)
    const [messages, setMessages] = useState(() => {
        const stored = localStorage.getItem('contactMessages');
        return stored ? JSON.parse(stored) : [];
    });

    //управление значением полей
    const [values, setValues] = useState({
        inp_first: '',
        inp_last: '',
        inp_name: '',
        inp_email: '',
        textarea: ''
    });


    //измененияе в любом из полей, 
    //обновляет валью
    const handleChange = (e) => {
        const { id, value } = e.target;
        setValues(prev => ({ ...prev, [id]: value }));
    };


    //добавляет класс к лейблам
    const getLabelClass = (id) => (values[id] ? 'contact__top' : '');

    //отправка формы
    //добавление в локалстор
    //очистка формы после отправления
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedMessages = [...messages, values];
        setMessages(updatedMessages);
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));

        console.log('Message saved:', values);

        setValues({
            inp_first: '',
            inp_last: '',
            inp_name: '',
            inp_email: '',
            textarea: ''
        });
    };


    return (
        <div>
            <Header />

            <section className='contact'>
                <form className="contact__container" onSubmit={handleSubmit}>

                    <h2 className='contact__title'>Contact</h2>
                    <div className="contact__div">
                        <label htmlFor="inp_first" className={`contact__label ${getLabelClass('inp_first')}`} >First name*</label>
                        <input className='contact__inp contact__inp-first'
                            type="text"
                            id='inp_first'
                            value={values.inp_first}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="contact__div">
                        <label htmlFor="inp_last" className={`contact__label ${getLabelClass('inp_last')}`}>Last name*</label>
                        <input className='contact__inp contact__inp-last'
                            type="text"
                            id='inp_last'
                            value={values.inp_last}
                            onChange={handleChange}
                            required />
                    </div>

                    <div className="contact__div">
                        <label htmlFor="inp_email" className={`contact__label ${getLabelClass('inp_email')}`}>Email address*</label>
                        <input className='contact__inp contact__inp-email'
                            type='email'
                            id='inp_email'
                            value={values.inp_email}
                            onChange={handleChange}
                            required />
                    </div>

                    <div className="contact__div">
                        <label htmlFor="textarea" className={`contact__label ${getLabelClass('textarea')}`}>Message</label>
                        <textarea className='contact__textarea'

                            id='textarea'
                            value={values.textarea}
                            rows={5}
                            onChange={handleChange}
                            required />
                    </div>

                    <div className="contact__btn-content">
                        <button type="submit" className='contact__btn'>SEND</button>
                    </div>
                </form>




            </section >
            <Footer />

        </div >
    )
}
