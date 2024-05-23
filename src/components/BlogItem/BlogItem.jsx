import React, { useState } from 'react'
import './BlogItem.css';
import { NavLink } from 'react-router-dom';


export default  function BlogItem({data}) {
const readingTime = (articleText) => {
    const wordsArray = articleText.split(' ');
    // Count the number of words in the array
    const wordCount = wordsArray.length;
    // Calculate the estimated reading time
    const wordsPerMinute = 200;
    return Math.ceil(wordCount / wordsPerMinute);
}
function truncateTitle(input) {
    if (input.length > 42) {
       return input.substring(0, 42) + '...';
    }
    return input;
 };
function truncateDescription(input) {
    if (input.length > 78) {
       return input.substring(0, 78) + '...';
    }
    return input;
 };
  return(
    <div className="card blog">
        <div className="image">
            <img src={data.imageUrl} alt="" />
        </div>
        <div className="content">
            <div className="stars">
                <span>{new Date(1200150846619).toDateString()}</span>
                <div className="duration">{readingTime(data.description)} min read</div>
            </div>
            <NavLink to={`/blogs/${data.id.trim().split(' ').join("_")}`} title={data.id}><h3>{truncateTitle(data.title)}</h3></NavLink>
            <p>{truncateDescription(data.description)} &raquo;</p>
        </div>
    </div>)
}
