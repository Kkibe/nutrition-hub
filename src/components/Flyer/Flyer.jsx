import React from 'react';
import Image from '../../assets/download.jpg';//africa_image
import './Flyer.css';

export default function Flyer() {
  return (
    <section id='home'>
      <div className="flyer">
        <div className="content">
          
          <h1>White Potatoes, 1 sack</h1>
          <span>Special Offer @3000 ksh</span>
          <p>Hurry up!</p>
          <a href="#" className='btn'>order now</a>
        </div>
        <div className="image">
          <img src={Image} alt="" />
        </div>
      </div>
    </section>
  )
}
