import React, { useEffect, useState } from 'react'
import './Home.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Dishes from '../../components/Dishes/Dishes'
import BlogItem from '../../components/BlogItem/BlogItem'
import { getBlogs, getProducts } from '../../../firebase'

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderProducts, setSliderProducts] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [blogs, setBlogs] = useState([]);
  useEffect(() =>{
    getBlogs(3, setBlogs);
    getProducts(3, setSliderProducts);
    getProducts(4, setDishes);
  }, []);

  
  const handleClick = (direction) => {
      if(direction === "left") {
          setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
      } else {
          setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
      }
  }

  function truncateTitle(input) {
    if (input.length > 42) {
       return input.substring(0, 42) + '...';
    }
    return input;
 };

function truncateDescription(myInput) {
    if (myInput.length > 78) {
       return myInput.substring(0, 78) + '...';
    }
    return myInput;
 };
  return (
    <section className='home'>
      {
        sliderProducts.length > 0 && (
      <div className="slider">
        <div className="arrow"  onClick={() => handleClick("left")}>
           <FaArrowLeft />
        </div>
        <div className="slide-wrapper" style={{transform: `translateX(${slideIndex * -100}vw)`}}>
        {
          sliderProducts.map((product) => {
            return (
              <div className="slide container" key={product.id} data={product}>
              <div className="image">
                <img src={product.imageUrl} alt="" />
              </div>
              <div className='slide-container'>
                <span>KSH {product.price}</span>
                <hr />
                <h2 className='sub-heading'>{product.name}</h2>
                <p>{product.description}</p>
                <a href={`/shop/${product.id}`} className='btn'>Shop Now</a>
              </div>
            </div>
            )
          })
        }
        {
          !blogs.length > 0 && <h2 className='sub-heading'>Connect to Internet and try again!</h2>
        }
        
        </div>
        <div className="arrow" onClick={() => handleClick("right")}>
           <FaArrowRight />
        </div>
      </div>
    )}
      {
        dishes.length > 0 && <Dishes data={dishes}/>
      }
      {
        !dishes.length > 0 && <div><h1 className='heading' >Oops!</h1><p>
        No Internet connection! Connect to Internet and try again
        </p>
        <a className='btn' onClick={() => {
        window.location.reload();
      }}>Reload</a>
        </div>
      }
      <h3 className="sub-heading">Explore Our Blog</h3>
      <h1 className="heading">Trending Posts</h1>
      <div className="container">
          {
            blogs.length > 0 && blogs.map((blog) => {
              return <BlogItem key={blog.id} data={blog}/>
            })
          }
          {
            !blogs.length > 0 && <h2 className='sub-heading'>Connect to Internet and try again!</h2>
          }
      </div>
    </section>
  )
}
