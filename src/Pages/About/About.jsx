import React from 'react'
import './style.scss'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import img01 from '../../assets/images/about01.jpg';
import img02 from '../../assets/images/about02.jpg';

export default function About() {
    return (
        <>
            <Header />
            <div className='about'>

                <div className="about__section">
                    <div className="about__container">
                        <h1 className='about__title'>About</h1>
                        <h3 className='about__title-info'>
                            Who we are and why we do what we do!
                        </h3>

                        <p className='about__text'>Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin ante a, gravida arcu. Nam fringilla molestie velit, eget pellentesque risus scelerisque a. Nam ac urna maximus, tempor magna et, placerat urna. Curabitur eu magna enim. Proin placerat tortor lacus, ac sodales lectus placerat quis. </p>
                        <h2 className='about__subtitle'>Top trends</h2>
                        <img className='about__img' src={img01} alt="img" />
                        <p className='about__text'> </p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis.
                        <ul>
                            <li className='about__li'>consectetur adipiscing elit. Aliquam placerat</li>
                            <li className='about__li'>Lorem ipsum dolor sit amet consectetur </li>
                        </ul>


                        <h2 className='about__subtitle'>Produced with care</h2>

                        <img className='about__img' src={img02} alt="" />
                        <p className='about__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio, in molestie diam bibendu.</p>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

