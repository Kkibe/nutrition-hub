import React, { useEffect, useState } from 'react'
import BlogItem from '../../components/BlogItem/BlogItem'
import {getBlogs } from '../../../firebase';
import Loader from '../../components/Loader/Loader';
import { doc, getDoc } from "firebase/firestore";
import { get } from 'firebase/database';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() =>{
    getBlogs(12, setBlogs);
  }, []);
  return (
    <section className='blogs'>
        <h1 className="heading">Read Our Blogs</h1>
        <div className="container">
          {
            blogs.length > 0 && blogs.map((blog) => {
              return <BlogItem key={blog.id} data={blog}/>
            })
          }
          {
            !blogs.length > 0 && <div><h1 className='heading' >Oops!</h1><p>
              No Internet connection! Connect to Internet and try again
              </p>
              <a className='btn' onClick={() => {
              window.location.reload();
            }}>Reload</a>
              </div>
          }
        </div>
    </section>
  )
}
