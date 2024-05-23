import React from 'react';
import './Search.css';
import { FaXmark } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
    const handleCloseSearch = () => {
        document.querySelector('#search-form').classList.toggle('active');
    }
  return (
    <form action='' id='search-form'>
        <input type="search" placeholder='search here...' name="" id="search-box" autoFocus/>
        <label htmlFor="search-box"><FaSearch /></label>
        <span id="close" onClick={handleCloseSearch}><FaXmark /></span>
    </form>
  )
}
