import React from 'react';
import './About.css';
import Image from '../../assets/MyNutrition.png';
import Image1 from '../../assets/tarrific.jpg';
import {FaArrowRight, FaBell, FaCheckCircle, FaDollarSign, FaFacebook, FaHeadset, FaInstagram, FaLinkedin, FaShippingFast, FaTwitter, FaYoutube } from "react-icons/fa";
import Faq from '../../components/FaqItem/Faq';
import Newsletter from '../../components/Newsletter/Newsletter';
import Review from '../../components/Review/Review';
import { FaX, FaXTwitter } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';

export default function About() {
  return (
    <section className='about' id='about'>
        <div className="channel-info">
            <div className="container">
                <div className="channel-icon">
                	<img src={Image} alt="" />
                </div>
                
                <div className="channel-title">
                	
                	<h1>MyNutrition<FaCheckCircle className='check'/></h1>
                	<div className="channel-subscriber-count"> <FaYoutube className='youtube'/>2,126,438 subscribers</div>
                </div>
                
                <div className="channel-subscribe">
                	<button className="subscribe-btn"> <Link to={''} >Subscribed 100k</Link></button>
                	<button className="notification-btn" aria-label="Enable Notifications"><FaXTwitter /></button>
                </div>
            </div>
            <p>
                Hello there and thanks for visiting our site.
                Feel free to ask any question in the contact page and don't forget to subscribe to our newsletter. Subscribe to our social media handles to get exclusive content.</p>
            <span>
                <a href="https://www.facebook.com/kibetkorirc" className='facebook icon' target='_blank' title='facebook'><FaFacebook /></a>
                <a href="https://twitter.com/ancientpupy" className='twitter icon' target='_blank' title='twitter'><FaTwitter /></a>
                <a href="https://www.instagram.com/ancientpupy/" className='instagram icon' target='_blank' title='instagram'><FaInstagram /></a>
                <a href="https://www.youtube.com/@codespear" className='youtube icon' target='_blank' title='youtube'><FaYoutube /></a>
                <a href="https://www.linkedin.com/in/kibetkorir" className='linkedin icon' target='_blank' title='linkedin'><FaLinkedin /></a>
            </span>
            <div className="links">
                <NavLink to="/contact-us" className={'btn'} title='contact'>Contact Us</NavLink>
                <NavLink to="/shop" className={'btn'} title='store'>Shop Now</NavLink>
            </div>
        </div>
        <div className="row">
        <div className="image">
                <img src={Image} alt="" />
            </div>
            <div className="content">
                <h1 className="heading">About <span style={{color: "#9B5DE5"}}>us</span></h1>
                <p>
                    Welcome to <NavLink to={'/'}>MyNutrition</NavLink>; a food and nutrition hub that presents you with a wide variety of food products in our <NavLink to={'/shop'}>store</NavLink> as well as food <NavLink to={'/cooking'}>recipes</NavLink>, techniques and tips. 
                    Our <NavLink to={'/cooking'}>cooking tutorials</NavLink> are easy to follow along, even while cooking and it is available for you in all our social media handles such as <NavLink to={'/'}>youTube</NavLink>. Create an account with us to enable you save you favorite articles and feeds. 
                </p>
            </div>
        </div>
        <div className="row">
            <div className="content">
                <h1 className="heading">Our <span style={{color: "#9B5DE5"}}>mission</span></h1>
                <p>
                    We aim to provide healthy, efficient and affordable food and nutrition services to all. To help you get the best out of nutrition by utilizing the <NavLink to={'/resources'}>resources</NavLink> we provide. 
                </p>
            </div>
            <div className="image">
                <img src={Image1} alt="" />
            </div>
        </div>
        <section>
 </section>
        <h3 className="sub-heading">about us</h3>
        <h1>why choose us?</h1>
        
        <div className="row">
            <div className="content">
                <h3>best recipes in town</h3>
                <p> 
                    MyNutrition is the best food and nutrition hub on the internet. You can find recipes, nutrition related blogs, and much more on cooking and general health.
                </p>
                <div className="icons-container">
                    <div className="icons">
                        <FaShippingFast className='icon'/>
                        <span>Free delivery</span>
                    </div>
                    <div className="icons">
                        <FaDollarSign className='icon'/>
                        <span>easy payments</span>
                    </div>
                    <div className="icons">
                        <FaHeadset className='icon'/>
                        <span>27/7 service</span>
                    </div>
                </div>
                <NavLink to={'/shop'} className="btn">Explore Marketplace</NavLink>
            </div>
        </div>
        <h1>FAQ</h1>
        <div className="faq-container">
            <Faq />
            <Faq />
            <Faq />
            <Faq />
        </div>
        <Review />
        <Newsletter/>
    </section>
  )
}
