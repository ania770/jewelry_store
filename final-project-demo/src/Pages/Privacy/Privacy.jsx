import React from 'react'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './style.scss'


export default function Privacy() {
    return (
        <div className='privacy'>
            <Header />
            <section className='privacy__section'>
                <div className="privacy__container">
                    <h1 className='privacy__title'>Privacy Policy</h1>
                    <p className='privacy__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio, in molestie diam bibendum sed.</p>
                    <h2 className='privacy__subtitle'>Security</h2>
                    <p className='privacy__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget .</p>
                    <h2 className='privacy__subtitle'>Cookies</h2>
                    <ul className='privacy__ul'>
                        <li className='privacy__ul-item'>
                            ● Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin ante a, gravida arcume
                        </li>
                        <li className='privacy__ul-item'>●  Nam fringilla molestie velit, eget pellentesque risus scelerisque
                        </li>
                    </ul>
                </div>
            </section>
            <Footer />
        </div>
    )
}
