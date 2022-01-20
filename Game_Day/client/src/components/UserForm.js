import React, { useState } from 'react';
import axios from 'axios';
// separating from the Registration in order to use this for user edits
const UserForm = (props) => {
    const { onSubmitProp, initialFirstName, initialLastName, initialEmail, initialBirthdate, initialPassword } = props;
    const [ firstName, setFirstName ] = useState(initialFirstName);
    const [ lastName, setLastName ] = useState(initialLastName);
    const [ email, setEmail ] = useState(initialEmail);
    const [ password, setPassword ] = useState(initialPassword);
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ birthdate, setBirthdate ] = useState(initialBirthdate);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        onSubmitProp({
            firstName,
            lastName,
            email,
            birthdate,
            password,
            confirmPassword            
        })
    }

    return(
        <div className='container'>
            <form onSubmit={formSubmitHandler}>
                <div className='col-8'>
                    <div className='form-floating mb-2'>
                        <input
                        type="text"
                        className='form-control'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} />
                        <label 
                        htmlFor='firstName' 
                        className='form-label'>First Name</label>
                    </div>
                    <div className='form-floating mb-2'>
                        <input
                        type="text"
                        className='form-control'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} />
                        <label 
                        htmlFor='lastName' 
                        className='form-label'>Last Name</label>
                    </div>
                    <div className='form-floating mb-2'>
                        <input
                        type="email"
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                        <label 
                        htmlFor='email' 
                        className='form-label'>Email</label>
                    </div>
                    <div className='form-floating mb-2'>
                        <input
                        type="birthdate"
                        className='form-control'
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)} />
                        <label 
                        htmlFor='birthdate' 
                        className='form-label'>Birthdate ( Must be at least 13)</label>
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
                    <div className='form-floating mb-2'>
                        <input
                        type="password"
                        className='form-control'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                        <label 
                        htmlFor='confirmPassword' 
                        className='form-label'>Confirm Password</label>
                    </div>
                    <button type='submit' className='btn btn-primary'>Register</button>

                </div>


            </form>
        </div>
    )
}
export default UserForm;