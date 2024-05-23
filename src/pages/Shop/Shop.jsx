import React, { useEffect, useState } from 'react'
import Flyer from '../../components/Flyer/Flyer'
import Dishes from '../../components/Dishes/Dishes'
import Menu from '../../components/Menu/Menu'
import { getProducts } from '../../../firebase';

export default function Shop() {
  const [dishes, setDishes] = useState([]);
  useEffect(() =>{
    getProducts(12, setDishes);
  }, []);
  
  return (
    <section>
        <Flyer />
        {
          dishes.length > 0 && <Dishes data={dishes}/>
        }
        <Menu />
    </section>
  )
}
