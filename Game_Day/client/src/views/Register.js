import React from 'react';
import axios from 'axios';
import UserForm from '../components/UserForm';
import { navigate } from '@reach/router';

const Register = (props) => {


    const createUser = (newUser) => {
        axios.post('http://localhost:8000/api/users/register', newUser)
            .then((res) => {
                console.log(res.data);
                navigate('/events/home');
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    return(
        <div className='offset-1'>
            {/* <h2 className="text-start ms-5">  Register</h2> */}
            <UserForm 
            onSubmitProp={createUser}
            initialFirstName=""
            initialLastName=""
            initialEmail=""
            initialBirthDate=""
            initialPassword=""
            />
        </div>
    )
}
export default Register;