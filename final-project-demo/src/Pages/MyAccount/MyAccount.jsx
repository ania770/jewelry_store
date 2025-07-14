import React from 'react'
import './style.scss'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function MyAccount() {
    // Обработка регистрации пользователя
    const handleSignup = (e) => {
        //остановка стандартного поведения формы (перезагрузка страницы)
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const phone = form.phone.value;
        const password = form.password.value;

        const userData = {
            username,
            phone,
            password
        };


        // Сохраняем данные в локалстор
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('Saved user:', userData);
        //после сохранения очищаем
        form.reset();
    };

    //вход
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log('Login attempt:', { email, password });

    };



    return (
        <div>
            <Header />
            <div className="main">
                <input className='main__inp main__inp-chk' type="checkbox" id="chk" aria-hidden="true" />

                <div className="main__signup">
                    <form onSubmit={handleSignup}>
                        <label className='main__signup-label' htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input className='main__signup-inp' type="text" name="username" placeholder="User name" required />
                        <input className='main__signup-inp' type="number" name="phone" placeholder="Telefona" required />
                        <input className='main__signup-inp' type="password" name="password" placeholder="Password" required />
                        <button className='main__signup-btn' type="submit">Sign up</button>
                    </form>
                </div>

                <div className="main__login">
                    <form onSubmit={handleLogin}>
                        <label className='main__login-label' htmlFor="chk" aria-hidden="true">Login</label>
                        <input className='main__login-inp' type="email" name="email" placeholder="Email" required />
                        <input className='main__login-inp' type="password" name="password" placeholder="Password" required />
                        <button className='main__login-btn' type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
