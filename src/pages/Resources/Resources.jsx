import React from 'react'
import PdfResource from '../../components/PdfResource/PdfResource';

import Image1 from '../../assets/burger.jpg';
import Image2 from '../../assets/pizza.jpg';
import Image3 from '../../assets/recipe.jpg';
import Image4 from '../../assets/chicken.jpg';
import Image5 from '../../assets/cake.jpg';
import Image6 from '../../assets/drink.jpg';
import {FaEye, FaStar, FaStarHalf } from "react-icons/fa";

export default function Resources() {
    const dishes = [
        {
          id: 1,
          title: "consectetur adipisicing elit.",
          price: 550,
          image: Image1,
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
          stars: 4.5,
          
        },
        {
          id: 2,
          title: "delicious food consectetur elit.",
          price: 550,
          image: Image2,
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
          stars: 4.5,
          
        },
        {
          id: 3,
          title: "consectetur adipisicing elit.",
          price: 550,
          image: Image3,
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
          stars: 4.5,
          
        },
        {
          id: 4,
          title: "consectetur adipisicing elit.",
          price: 550,
          image: Image4,
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
          stars: 4.5,
          
        },
        {
          id: 5,
          title: "delicious food consectetur adipisicing elit.",
          price: 550,
          image: Image5,
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
          stars: 4.5,
          
        },
        {
          id: 6,
          title: "delicious food Sit natus.",
          price: 550,
          image: Image6,
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
          stars: 4.5,
          
        },
      ];
  return (
    <section>
        <h3 className="sub-heading">Explore Resources</h3>
        <h1 className="heading">Featured Recipe PDF</h1>
        <div className="container">
          {
            dishes && dishes.map(item => {
              return <PdfResource data={{...item}} key={item.id} />
            })
          }
        </div>
    </section>
  )
}
