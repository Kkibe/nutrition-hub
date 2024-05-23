import React, { useState } from 'react'
import './PdfResource.css'

import {FaArrowDown, FaEye, FaFilePdf, FaLink, FaPage4, FaStar, FaStarHalf } from "react-icons/fa";
import { FaFileArrowDown } from 'react-icons/fa6';


export default function PdfResource({data}) {

  function download(){
    const file_url = 'https://www.google.com.ua/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
    var el = document.createElement('a');
    el.download = file_url;
    el.href = file_url;
    document.body.appendChild(el);
    el.click();
    el.remove();
  }


   
  const [image, setImage] = useState('');
  const [Url, setUrl] = useState('');
  
  const upload = () => {
      if (image == null)
          return;
      setUrl("Getting Download Link...")

      // Sending File to Firebase Storage
      storage.ref(`/images/${image.name}`).put(image)
          .on("state_changed", alert("success"), alert, () => {

              // Getting Download Link
              storage.ref("images")
                  .child(image.name)
                  .getDownloadURL()
                  .then((url) => {
                      setUrl(url);
                  })
          });
  }

    return(
      <div className="card pdf">
        <h1 >{data.title}</h1>
        <h3 className='sub-heading'>{data.title}</h3>
        <p>{data.description}</p>
        <span>
          <a href="#" className="btn">
            <FaFilePdf /> 12
          </a>
          <a className="btn" onClick={download}>Download</a>
        </span>
        <div className="tag">free</div>
      </div>)
  }