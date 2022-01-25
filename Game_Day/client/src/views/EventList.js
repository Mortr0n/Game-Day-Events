import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ListEvents from '../components/ListEvents';
import ListTodayEvents from '../components/ListTodayEvents';
import format from 'date-fns/format';

const EventList = (props) => {
    const { gameEvents, setGameEvents, user, setUser } = props;
    const [ loaded, setLoaded ] = useState(false);
    const [ todaysEvents, setTodaysEvents ] = useState([]);
    const [ futureEvents, setFutureEvents ] = useState([]);
    let today = new Date().toLocaleDateString();

    useEffect(() => {
        axios.get('http://localhost:8000/api/events')
            .then((res) => {
                console.log(res.data);
                setGameEvents(res.data);
                setLoaded(true);                 
            })
            .catch((err) => console.log(err));
    }, [])

    const removeFromDom = (eventId) => {
        setGameEvents(gameEvents.filter(gameEvent=>gameEvent._id !== eventId));
    }

    return(
        <div>
            <NavBar />
            {/* <h1 className='pageTitle'>Upcoming Events</h1> */}
            <div className="section-title-four">
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="content">
                        <span>Upcoming Events</span>
                        <h3 className="gray-bg">Events</h3>
                        <h2 className='fw-bold mt-5'>Upcoming Events!</h2>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div className='row'>
            <h2 className="fw-bold mb-3">Todays Events</h2>                        
                {
                    loaded &&
                    <ListTodayEvents gameEvents={gameEvents} setGameEvents={setGameEvents} loaded={loaded} user={user} setUser={setUser} />
                }  
            </div>
            { loaded &&
                <ListEvents gameEvents={gameEvents} setGameEvents={setGameEvents} futureEvents={futureEvents}  user={user} setUser={setUser} />
            }
        </div>
    )
}
export default EventList;