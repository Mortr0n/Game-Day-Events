import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import ListEventsAttending from '../components/ListEventsAttending';
import ListTodaysEventsAttending from '../components/ListTodaysEventsAttending';

const Main = (props) => {
    const { user, setUser } = props;
    const [ loaded, setLoaded ] = useState(false);
    const [ eventsAttending, setEventsAttending ] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/getLoggedIn`, {
            withCredentials: true
        })
        .then((res) => {
            setUser(res.data)
            setEventsAttending(res.data.eventsAttending);
            // console.log(res.data);
            // console.log(eventsAttending)
            setLoaded(true);
        })
        .catch((err) => console.log(err));
    }, [])

return(
        <div>
            <NavBar />
            {/* <h2 className='pageTitle'>Welcome User!</h2> */}
            <div className="section-title-four">
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="content">
                        <span>Welcome</span>
                        <h2 className="fw-bold">{user.firstName} {user.lastName}</h2>
                        <h3 className="gray-bg">WELCOME</h3>
                        </div>
                    </div>
                </div>
                
            </div>
            </div>
            <div className='row'>
                {
                    loaded &&
                    <div className='col-8 offset-2'>
                        <ListTodaysEventsAttending user={user} setUser={setUser} eventsAttending={eventsAttending} setEventsAttending={setEventsAttending} />
                    </div>
                } 
            </div>
            <div className='col-8 offset-2'>
                {
                    loaded &&
                    <ListEventsAttending user={user} setUser={setUser} />
                }
            </div>
        </div>
    )
}
export default Main;