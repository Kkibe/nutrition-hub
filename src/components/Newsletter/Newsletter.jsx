//import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./Newsletter.css"
import { FaForward, FaShare } from 'react-icons/fa';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const scriptUrl = 'https://sheet.best/api/sheets/06a8d0fe-8f2e-4729-8bcf-d7b0d61bf4e8';
    const handleSubmit = (e) => {
        e.preventDefault();
        /*axios.post(scriptUrl, {
            Email : email
        }).then((res) => {
            setSuccess(res)
        }).catch(err => {
            setError(err.message);
        })
        e.target.children[0].value = '';*/
    }

    useEffect(() => {
        setTimeout(() => {
            error && setError(null);
            success && setSuccess(null);
        }, 2000);
    }, [success, error]); 
    return (
        <section className='newsletter' id='subscribe'>
            <h2>Subscribe to our email List</h2>
            <p>Subscribe Now</p>
            <form onSubmit={handleSubmit}>
                <input type='email' name='email' placeholder='example@gmail.com' title='enter email' onChange={(e) => setEmail(e.target.value)} required/>
                <button type='submit' className='btn' title='submit'><FaShare /></button>
            </form>
            {
                error && <p className='error'>{error}!</p>
            }
            {
                success && <p className='success'>Thank You For Subscribing!</p>
            }
        </section>
    );
}

export default Newsletter;
