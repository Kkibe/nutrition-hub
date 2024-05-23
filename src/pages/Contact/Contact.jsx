//import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Contact.css"
import { addContact } from '../../../firebase';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(false);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact({name, email, phone, message}, setToast, setError);
    }

    useEffect(() => {
        setTimeout(() => {
            error && setError(null);
            success && setSuccess(null);
        }, 2000);
    }, [success, error]); 
    return (
        <div className='contact'>
            <form onSubmit={handleSubmit}>
                <h1>GET IN TOUCH</h1>
                <input type="text" id='name' placeholder='Your Name' onChange={(e) => setName(e.target.value)} value={name} required />
                <input type="email" id='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                <input type='tel' id='phone' placeholder='Phone Number (optional)' onChange={(e) => setPhone(e.target.value)} value={phone}/>
                <textarea  id="message" rows="4" placeholder='How can we help you?' onChange={(e) => setMessage(e.target.value)} value={message} required></textarea>
                <button className='btn' type='submit' title='submit'>Send</button>
                {
                    error && <p className='error'>{error}!</p>
                }
                {
                    success && <p className='success'>Your message was submitted successfully!</p>
                }
            </form>
        </div>
    );
}

export default Contact; 
