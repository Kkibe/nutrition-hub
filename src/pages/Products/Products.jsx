import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app';
import 'firebase/firestore';

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        const snapshot = await firebase.firestore().collection('products').get();
        const productsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      };
      fetchProducts();
    }, []);
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}
