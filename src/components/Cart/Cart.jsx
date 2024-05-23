import React from 'react';
import './Cart.css'
import { FaXmark } from "react-icons/fa6";
import Image from '../../assets/MyNutrition.png';

export default function Cart() {
  const toggleSingle = () => {
    document.querySelector('.cart').classList.toggle('active');
  }

  const CartItem = () => {
    
    return (
      <tr className="card cart-item">
        <td className='image-container'><img src={Image}/></td>
        <td><p><input type="number" value="1" min="0" max="99"/></p></td>
        <td><p>Design Bundle Package</p></td>
        <td><p>$79.00</p></td>
        <td ><p><span className="remove close"><FaXmark /></span></p></td>
      </tr>
    )
  }
  return (
    <div className='cart'>
      <table className="wrapper">
      <thead>
          <tr> 
            <th className="first sub-heading">Photo</th>
            <th className="second sub-heading">Quantity</th>
            <th className="third sub-heading">Product</th>
            <th className="fourth sub-heading">Total</th>
            <th className="fifth sub-heading">&nbsp;</th>
          </tr>
        </thead>
        <tbody className="cartBody">
           <CartItem />
        </tbody>
        <div className="cartFooter"></div>
      </table>
      <span id="close" onClick={toggleSingle}><FaXmark /></span>
    </div>
  )
}
