import React, { useState } from 'react'
import { FaRegPlayCircle, FaShareAlt, FaStar } from 'react-icons/fa'
import ShareModal from '../ShareModal/ShareModal';

export default  function CookingItem({data}) {
  const [visible, setVisible] = useState(false);
  return(
    <div className="card">
        {
          visible && <ShareModal visible={visible} setVisible={setVisible}/>
        }
        <div className="image">
            <img src={data.image} alt="" />
            <a className='icon' onClick={() => setVisible(true)}><FaShareAlt /></a>
            <FaRegPlayCircle className='button'/>
        </div>
        <div className="content">
            <div className="stars">
                <FaStar className='star'/>
                <span>5.2K</span>
                <div className="duration">6 min</div>
            </div>
            <h3>{data.title}</h3>
            <p>
              <div className="hash">special</div>
              <div className="hash">menu</div>
              <div className="hash">dinner</div>
              <div className="hash">calorie-free</div>
            </p>
            <span className="views">100k Views . 2w ago</span>
        </div>
    </div>)
}