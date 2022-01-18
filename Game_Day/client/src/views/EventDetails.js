import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import CommentForm from '../components/CommentForm';
import { format } from 'date-fns';
import { Link, navigate } from '@reach/router';
import DeleteButton from '../components/DeleteButton';

const EventDetails = (props) => {
    const { id } = props;
    const [ comment, initialComment ] = useState("");
    const [ gameEvent, setGameEvent ] = useState();
    const [ loaded, setLoaded ] = useState(false);
    const [ eventDate, setEventDate] = useState("")

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
            { 
            loaded &&
            <div className='container '>
            
                <div className='row eventDetailsTop mt-2'>
                    <h2 className='pageTitle'>{gameEvent.eventName}</h2>
                    <div className='col-3 offset-2'>
                        <p className='eventHeaders'>Event Date</p>
                        <p className='eventHeaders'>Attending</p>
                    </div>
                    <div className='col-6'>
                        <p className='eventHeaders'>
                            {/* using date-fns to format date here */}
                            {format(new Date(gameEvent.date), 'MMMM-dd-yyyy')}
                            </p>
                        <p className='eventHeaders'>{gameEvent.attendeeMax}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3 offset-2'>
                        {/* TODO: Edit Button needs replaced with real thing */}
                        <Link className='removeTextDecoration' to={`/events/${id}/edit`}><button className='btn btn-success '>Edit</button></Link>
                        <p className='eventDetailLabels fw-bold'>Event Location</p>
                        <div className='featuredEventsBox mb-5'>
                            <p className='eventDetailLabels fw-bold'>Featured Events</p>
                            <p className='eventDetailLabels'>{gameEvent.suggestedGame}</p>
                        </div>
                    </div>
                    <div className='col-6'>
                        {/* TODO: Replace Delete With Real Thing */}
                        <DeleteButton id={id} successCallback={() => navigate('/events/list')} />
                        <p className='eventDetailLabels'>{gameEvent.streetAddress}</p>
                        <p className='eventDetailLabels'>{gameEvent.city}, {gameEvent.state}  {gameEvent.zip}</p>
                        <p className='eventDetailLabels fw-bold'>Event Description</p>
                        <p className='eventDescriptionBox'>{gameEvent.eventDescription}</p>
                    </div>
                </div>
                <div className='row text-start'>
                    <p className='eventDetailLabels fst-italic'>Leave a comment</p>
                    <textarea className='form-control' rows="4" cols="50"></textarea>
                </div>
            </div>
            
            }
            {
                loaded &&
                <CommentForm initialComment={initialComment} />
            }
            

        </div>
    )
}
export default EventDetails;