import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';

const EventDetails = (props) => {
    const { id } = props;
    const [ gameEvent, setGameEvent ] = useState();
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/events/${id}`)
            .then((res) => {
                console.log(res.data);
                setGameEvent(res.data);
                setLoaded(true);
            })
            .catch((err) => console.log(err))
    }, [])

    return(
        <div>
            <NavBar />
            { loaded &&
            <div className='container eventDetailsTop'>
            <h2 className='pageTitle'>{gameEvent.eventName}</h2>
                <div className='row'>
                    <div className='col-3 offset-2'>
                        <p className='eventHeaders'>Event Date</p>
                        <p className='eventHeaders'>Attending</p>
                    </div>
                    <div className='col-6'>
                        <p className='eventHeaders'>{gameEvent.date}</p>
                        <p className='eventHeaders'>{gameEvent.attendeeMax}</p>
                    </div>
                </div> 
            
            </div>}
            
        </div>
    )
}
export default EventDetails;