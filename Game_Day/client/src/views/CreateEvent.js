import { navigate } from '@reach/router';
import axios from 'axios';
import React from 'react';
import EventForm from '../components/EventForm';
import NavBar from '../components/NavBar';

const CreateEvent = (props) => {
    const { gameEvents, setGameEvents } = props;

    // take in new game event object and post to api logging the result or error
    const createEventHandler = (gameEvent) => {
        axios.post('http://localhost:8000/api/events', gameEvent,
        {
            withCredentials: true,
        })            
            .then((res) => {
                console.log(res.data);
                // add event to the gameEvents array
                setGameEvents([...gameEvents, res.data]);
                navigate('/events/list')
            })
            .catch((err) => {
                if(err.response.status === 401) {
                    console.log(err.response);
                    navigate('/events')
                } 
                console.log(err.response);
            })
    }

    return(
        <div className='createEvent'>
            <NavBar />
            <div className="section-title-four">
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="content">
                        <span> New Event</span>
                        <h2 className="fw-bold">Create a New Event</h2>
                        <h3 className="gray-bg">NEW</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {/* <h1 className='pageTitle'>New Event</h1> */}
            {/* Setting initial values for the form since it will be used for 
            both create and update */}
            
            <EventForm 
            onSubmitProp={createEventHandler}
            initialEventName=""
            initialStreetAddress=""
            initialCity=""
            initialState=""
            initialZip=""
            initialAttendeeMax=""
            initialDate=""
            initialSuggestedGame=""
            initialEventDescription=""
            />
        </div>
    )
}
export default CreateEvent;