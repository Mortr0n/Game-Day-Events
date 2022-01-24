import React, { useEffect, useState } from 'react';
import axios from 'axios'
import NavBar from '../components/NavBar';

const UserProfile = (props) => {
    const [ user, setUser ] = useState({});
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/getLoggedIn', {
            withCredentials: true
        })
            .then((res) => {
                setUser(res.data);
                setLoaded(true);
            })
            .catch((err) => console.log(err));
    }, [])

    return(
        <div>
            <NavBar />
            {
                loaded &&
                <div className='row mt-5'>
                <div className='col-5'>
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
                </div>
                <div className='col-6'>
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
            </div>
            }
        </div>
    )
}
export default UserProfile;