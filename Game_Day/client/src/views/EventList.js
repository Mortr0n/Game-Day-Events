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
            <div class="section-title-four">
            <div class="container">
                <div class="row mt-5">
                    <div class="col-12">
                        <div class="content">
                        <span>Upcoming Events</span>
                        <h2 class="fw-bold">All Events</h2>
                        <h3 class="gray-bg">Events</h3>
                        <p>Check out our future events!</p>
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