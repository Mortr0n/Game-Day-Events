import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const Login = (props) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);
    

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login", {
            email: email,
            password: password,
        }, {
            // forcing the sending of credentials/cookies to be updated
            withCredentials: true
        })
        .then((res) => {
            console.log(res.data);
            console.log(res.userFirstName)
            // setFirstName(res.userFirstName);
            navigate('/events/home');
        })
        .catch((err) => {
            console.log(err.response);
            if(err.response.data.errors) {
                setErrors(err.response.data.errors);
            }
        })
    }

    return(
        <div className='col-6'>
            <form onSubmit={loginHandler}>
            <div className='form-floating mb-2'>
                <input
                type="email"
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                {
                    errors.email ?
                    <label 
                    htmlFor='email' 
                    className='form-label red'>{errors.data.message}</label> :
                    <label 
                    htmlFor='email' 
                    className='form-label'>Email</label>
                }
            </div>
            <div className='form-floating mb-2'>
            <input
            type="password"
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <label 
            htmlFor='password' 
            className='form-label'>Password</label>
            </div>
            <button type='submit' className='btn btn-info'>Login</button>
        </form>
        </div>
        
    )
}
export default Login;