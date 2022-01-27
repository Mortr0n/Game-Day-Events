import React, { useEffect, useState } from 'react';
import axios from 'axios'
import NavBar from '../components/NavBar';
import { Link } from '@reach/router';

const UserProfile = (props) => {
    const [ user, setUser ] = useState({});
    const [ loaded, setLoaded ] = useState(false);
    const [ comments, setComments ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/getLoggedIn', {
            withCredentials: true
        })
            .then((res) => {
                setUser(res.data);
                axios.get('http://localhost:8000/api/userComments', {
                    withCredentials: true,
                })
                    .then((res) => {
                        console.log(res.data);
                        setComments(res.data);
                        setLoaded(true);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                
            })
            .catch((err) => console.log(err));
    }, [])

    return(
        <div>
            <NavBar />
            {
                loaded &&
                <div className='row mt-5'>
                <div className='col-5 offset-1'>
                    <div className='row'>
                        <div className='col-3 offset-1 mb-5'>
                            <p className='accountText'>Name:</p>
                        </div>
                        <div className='col-6 mb-5'>
                            <p className='accountText'>{user.firstName} {user.lastName}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 offset-1'>
                            <p className='accountText'>Email :</p>
                        </div>
                        <div className='col-3 mb-5'>
                            <p className='accountText'>{user.email}</p>
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
                    <div className='row'>
                    <div className='col-7 offset-1'>
                        <h3 className='fw-bold'>Comment Count</h3>
                    </div>
                    <div className='col-1'>
                        <h3 className='fw-bold'>{comments.length}</h3>
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
                        <button className='btn btn-info mt-5' type='submit'>
                            Edit Account
                        </button>                        
                    </Link>
                </div>
            </div>
            }
        </div>
    )
}
export default UserProfile;