import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import "./Auth.css"
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { signInUser, readUser, signInWithGoogle, auth } from '../../../firebase';
import ThanksModal from '../../components/ThanksModal/ThanksModal';
import { onAuthStateChanged } from 'firebase/auth';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [user, setUser] = useState('');
    const [toast, setToast] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email && password) {
            if(email.match(mailformat)){
                signInUser(email, password, setToast, setError);
                setUser(readUser());
            } else {
                setError("You have entered an invalid email address!");
            }
        } else {
            setError('enter email and password');
            return;
        } 
    }
    
    useEffect(() => {
        setTimeout(() => {
            error && setError(null);
            success && setSuccess(null);
        }, 2000);
    }, [success, error]); 

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              return window.history.back();
            } else {
              return null;
            }
          });
    }, []);
      
      
    return (
        <div className='auth'>
            {user && (<Navigate to="/profile" replace={true} />)}
            {!toast === null && ( <ThanksModal title={"Thankyou!"} text={toast} runFunction={setToast}/>)}
            <form onSubmit={handleSubmit}>
                <h1>Welcome Back</h1>
                <input type="email" id='email' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" id='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete='true' />
                <button className='btn' type='submit' title='submit'>Login</button>
                {
                    error && <p className='error'>{error}!</p>
                }
                {
                    success && <p className='success'>Your message was submitted successfully!</p>
                }
                <h2 className='sub-heading'>
                  Sign In With:
                </h2>
                <span className='iconContainer'>
                  <button className='btn google' onClick={() => signInWithGoogle()}><span>Google <FaGoogle /></span></button>
                  <button className='btn facebook'><span>Facebook <FaFacebook /></span></button>
                </span>
            </form>
        </div>
    );
}

export default LoginForm; 