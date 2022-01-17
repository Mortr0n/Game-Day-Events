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

    return(
        <div>
            <NavBar />
            <h1 className='pageTitle'>Upcoming Events</h1>
            { loaded &&
                <ListEvents gameEvents={gameEvents} setGameEvents={setGameEvents} />
            }
        </div>
    )
}
export default EventList;