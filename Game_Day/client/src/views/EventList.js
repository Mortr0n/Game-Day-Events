import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ListEvents from '../components/ListEvents';

const EventList = (props) => {
    const { gameEvents, setGameEvents } = props;
    const [ loaded, setLoaded ] = useState(false);

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
                        <h2 className="fw-bold">Todays Events</h2>
                        <p className='eventHeaders'>No Events Scheduled for today.</p>
                        <h3 className="gray-bg">Events</h3>
                        <h2 className='fw-bold mt-5'>Upcoming Events!</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            { loaded &&
                <ListEvents gameEvents={gameEvents} setGameEvents={setGameEvents}  />
            }
        </div>
    )
}
export default EventList;