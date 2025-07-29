import React from 'react'
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import './style.scss'

export default function Error() {
    return (
        <div className='error'>
            <Header />
            <div className="error__container">
                <h1 className='error__title'>404 ERROR</h1>
                <p className='error__text'>This page not found;<br />
                    back to home and start again
                </p>
                <Link to='/'>
                    <button className='error__button'>homepage</button></Link>

            </div>
        </div>
    )
}
