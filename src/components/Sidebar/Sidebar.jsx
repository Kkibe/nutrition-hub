import React, { useEffect, useState } from 'react';
import './sidebar.css';
import { FaBlog, FaBookmark, FaHome, FaHotel, FaInfoCircle, FaSms } from 'react-icons/fa';
import { FaListCheck, FaShop } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

export default function Sidebar() {
  const [user, setUser] = useState(null);

  const handleToggle = async () => {
    document.querySelector('#sidebar').classList.remove('active');
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          return setUser(user);
        } else {
          return null;
        }
      });
  }, [])
  return (
    <div className="sidebar"  id='sidebar'>
      <nav>
        <NavLink to="/" onClick={handleToggle}><FaHome /> Home</NavLink>
        <NavLink to="shop" onClick={handleToggle}><FaShop /> Shop</NavLink>
        <NavLink to="cooking" onClick={handleToggle}><FaHotel/> Cooking</NavLink>
        <NavLink to="blogs" end onClick={handleToggle}><FaBlog /> Blog</NavLink>
        <NavLink to="resources" end onClick={handleToggle}><FaListCheck /> Resources</NavLink>
        {user && <NavLink to="bookmarks" end onClick={handleToggle}><FaBookmark />My Bookmarks</NavLink>}
        <NavLink to="about-us" end onClick={handleToggle}><FaInfoCircle /> About Us</NavLink>
        <NavLink to="contact-us" end onClick={handleToggle}><FaSms /> Contact Us</NavLink>
      </nav>
      {!user && <NavLink to="/login" className="btn btn--white" onClick={handleToggle}>Sign In →</NavLink>}
      
    </div>
  );
}
