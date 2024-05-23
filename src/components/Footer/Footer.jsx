import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <section className='footer'>
        <div className="container">
            <div className="wrapper">
                <h3>Quick Links</h3>
                <a href="#">home</a>
                <a href="#">dishes</a>
                <a href="#">about</a>
                <a href="#">menu</a>
            </div>
            <div className="wrapper">
                <h3>locations</h3>
                <a href="#">Nairobi</a>
                <a href="#">Ndumbuini</a>
                <a href="#">Nairobi CBD</a>
                <a href="#">Uthiru</a>
            </div>
            <div className="wrapper">
                <h3>contact us</h3>
                <a href="#">+254 797000000</a>
                <a href="#">support@mynutrition.com</a>
                <span>
                    <a href=""><FaFacebook className='link' /></a>
                    <a href=""><FaWhatsapp className='link'/></a>
                    <a href=""><FaPinterest className='link'/></a>
                    <a href=""><FaTwitter className='link'/></a>
                    <a href=""><FaInstagram className='link'/></a>
                </span>
            </div>
        </div>
        <div className="credit">&copy; {new Date().getFullYear()} <span>MyNutrition</span></div>
    </section>
  )
}
