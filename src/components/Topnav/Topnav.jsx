import React, { useEffect, useRef, useState } from 'react';
import './Topnav.css';
import { FaBars, FaHeart, FaNutritionix, FaSearch, FaShoppingCart, FaUtensils } from "react-icons/fa";
import { FaHeartCircleCheck, FaXmark } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { auth, readUser } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Topnav() {
    const [user, setUser] = useState(null);
    
    const handleToggle = async () => {
        document.querySelector('#sidebar').classList.toggle('active');
    }

    useEffect(() => {
        document.onscroll = () => {
                document.querySelector('#sidebar').classList.remove('active');
        }
        onAuthStateChanged(auth, (user) => {
            if (user) {
              return setUser(user);
            } else {
              return null;
            }
          });
    }, [])

    const handleOpenSearch = () => {
        document.querySelector('#search-form').classList.toggle('active');
    }
  
  return (
    <header>
        <a href="/" className="logo"><FaHeartCircleCheck />MyNutrition</a>
        <div className="icons">
            <div className="icon" id='bars' onClick={handleToggle}>
                <FaBars />
            </div>
            <div className="icon" id='search-icon'  onClick={handleOpenSearch}><FaSearch/></div>

            <NavLink to='/cart' className='icon' title='cart'><span>3</span><FaShoppingCart /></NavLink>
        </div>
        {!user && <NavLink to="/get-started" className="btn">Get Started</NavLink>}
    </header>
  )
}
