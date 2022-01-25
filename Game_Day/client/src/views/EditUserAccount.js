import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { Link } from '@reach/router';
import {format, parseISO} from 'date-fns';

const EditUserAccount = (props) => {
    const [ user, setUser ] = useState({});
    const [ loaded, setLoaded ] = useState(false);
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ birthdate, setBirthdate ] = useState("");


    
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/getLoggedIn', {
            withCredentials: true
        })
            .then((res) => {
                setUser(res.data);
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
                setBirthdate(user.birthdate);   
                setLoaded(true); 

            })
            .catch((err) => console.log(err));
    }, [loaded])

    

    return(
        <div>
            <NavBar />
            
            {
                loaded &&
                <form>
                <div className='row mt-5'>
                <div className='col-5 offset-1'>
                    
                    <div className='row'>
                        <div className='col-3 offset-1 mb-5'>
                            <p className='accountText'>First Name:</p>
                        </div>
                        <div className='col-6 mb-5'>
                            {/* <p className='accountText'>{user.firstName} {user.lastName}</p> */}
                            <input 
                            type="text"
                            className='form-control'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className='col-3 offset-1 mb-5'>
                            <p className='accountText'>Last Name:</p>
                        </div>
                        <div className='col-6 mb-5'>
                            {/* <p className='accountText'>{user.firstName} {user.lastName}</p> */}
                            <input 
                            type="text"
                            className='form-control'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />
                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-3 offset-1'>
                            <p className='accountText'>Email :</p>
                        </div>
                        <div className='col-6 mb-5'>
                            <input
                            type="text"
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 offset-1'>
                            <p className='accountText'>Birtdate</p>
                        </div>
                        <div className='col-6 mb-5'>
                            <input
                            type="text"
                            className='form-control'
                            value={birthdate}
                            onChange={(e) => setBirthdate((e.target.value))} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 offset-2 mb-5'>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th className='accountText'>Events Attending</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    user.eventsAttending &&
                                user.eventsAttending.map((event) => {
                                    return(
                                        <tr key={event._id}>
                                            <td className='accountText'>{event.eventName}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='row mb-5'>
                        <div className='col-6 offset-4'>
                            <p className='accountText'>Profile Picture</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 offset-4'>
                            <img src="#" alt="Profile Image"/>
                        </div>
                        
                        
                    </div>
                </div>
                <div className='row'>
                    <Link  to={`/users/edit/${user._id}`}>
                        <button className='btn btn-info' type='submit'>
                            Submit Edit
                        </button>                        
                    </Link>
                    
                </div>
                
            </div>
            </form>
            }
        </div>
    )
}
export default EditUserAccount;