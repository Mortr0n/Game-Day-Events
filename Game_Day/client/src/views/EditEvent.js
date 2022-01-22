import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import EventForm from '../components/EventForm';
import { navigate } from '@reach/router';


const EditEvent = (props) => {
    const { id } = props;
    const [ eventName, setEventName ] = useState("");
    const [ streetAddress, setStreetAddress ] = useState("");
    const [ city, setCity ] = useState("");
    const [ state, setState ] = useState("");
    const [ zip, setZip ] = useState("");
    const [ attendeeMax, setAttendeeMax ] = useState("");
    const [ date, setDate ] = useState("");
    const [ suggestedGame, setSuggestedGame ] = useState("");
    const [ eventDescription, setEventDescription ] = useState("");
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/events/${id}`)
            .then((res) => {
                console.log(res.data);
                setEventName(res.data.eventName);
                setStreetAddress(res.data.streetAddress);
                setCity(res.data.city);
                setState(res.data.state);
                setZip(res.data.zip);
                setAttendeeMax(res.data.attendeeMax);
                setDate(res.data.date);
                setSuggestedGame(res.data.suggestedGame);
                setEventDescription(res.data.eventDescription);
                setLoaded(true);
            })
    }, [])

    const updateEventHandler = (gameEvent) => {
        axios.put(`http://localhost:8000/api/events/${id}`, gameEvent)
            .then((res) => {
                navigate(`/events/${id}`)
            })
            .catch((err) => {
                if(err.response.status === 401) {
                    navigate('/events')
                } 
                console.log(err.response);
            });
    }


    return(
        <div>
            <NavBar />
            {
                loaded &&
                <EventForm 
                onSubmitProp={updateEventHandler}
                initialEventName={eventName}
                initialStreetAddress={streetAddress}
                initialCity={city}
                initialState={state}
                initialZip={zip}
                initialAttendeeMax={attendeeMax}
                initialDate={date}
                initialSuggestedGame={suggestedGame}
                initialEventDescription={eventDescription}
                />
            }
            
        </div>
    )
}
export default EditEvent;