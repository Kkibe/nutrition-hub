import React, { useState } from 'react'
import './Cooking.css';
import Image1 from '../../assets/burger.jpg';
import Image2 from '../../assets/pizza.jpg';
import Image3 from '../../assets/recipe.jpg';
import Image4 from '../../assets/chicken.jpg';
import Image5 from '../../assets/cake.jpg';
import Image6 from '../../assets/drink.jpg';
import CookingItem from '../../components/CookingItem/CookingItem';
import Flyer from '../../components/Flyer/Flyer';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function Cooking() {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
      if(direction === "left") {
          setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
      } else {
          setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
      }
  }
  const dishes = [
    {
      id: 1,
      title: "tasty food",
      price: 550,
      image: Image1,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
      stars: 4.5,
      
    },
    {
      id: 2,
      title: "delicious food",
      price: 550,
      image: Image2,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
      stars: 4.5,
      
    },
    {
      id: 3,
      title: "delicious food",
      price: 550,
      image: Image3,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
      stars: 4.5,
      
    },
    {
      id: 4,
      title: "tasty food",
      price: 550,
      image: Image4,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
      stars: 4.5,
      
    },
    {
      id: 5,
      title: "delicious food",
      price: 550,
      image: Image5,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
      stars: 4.5,
      
    },
    {
      id: 6,
      title: "delicious food",
      price: 550,
      image: Image6,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
      stars: 4.5,
      
    },
  ];
  return (
    <section className='cooking' id='cooking'>
        <h3 className="sub-heading">From Our Kitchen</h3>
        <h1 className="heading">chef's specialty</h1>
        <div className="container">
          {
            dishes && dishes.map(item => {
              return <CookingItem data={{...item}} key={item.id} />
            })
          }
        </div>
        <h3 className="sub-heading">Discover Recipes</h3>
        <h1 className="heading">Popular Recipes</h1>
        <div className="container">
          {
            dishes && dishes.map(item => {
              return <CookingItem data={{...item}} key={item.id} />
            })
          }
        </div>
    </section>
  )
}
