import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import "./Auth.css"
import { auth, createUser, readUser } from '../../../firebase';
import ThanksModal from '../../components/ThanksModal/ThanksModal';
import { onAuthStateChanged } from 'firebase/auth';


const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState(null);

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const user = readUser();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(username && email && password) {
            if(email.match(mailformat)){
                if(!password.match(passw)){
                    setError('Wrong password format!')
                    return ; 
                }
                 createUser(username, email, password, setToast, setError);
             } else {
               setError("You have entered an invalid email address!")
               return ;
            }
        } else {
          setError('enter username, email and password');
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
            {toast && ( <ThanksModal title={"Thankyou!"} text={toast} runFunction={setToast}/>)}
            <form onSubmit={handleSubmit}>
                <h1>Get Started</h1>
                <input type="text" id='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} required />
                <input type="email" id='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required/>
                <p>1 Uppercase, 1 lowercase, 6 characters</p>
                <input type="password" id='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} required />
                <input type="password" id='password-repeat' placeholder='Repeat Password' required />
                <button className='btn' type='submit' title='submit'>Register</button>
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

export default RegisterForm; 