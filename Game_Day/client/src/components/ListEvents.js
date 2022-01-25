import React, { useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import { format } from 'date-fns';
import JoinEventButton from './JoinEventButton';
import axios from 'axios';
import UnJoinEventButton from './UnJoinEventButton';

const EventList = (props) => {
    const { gameEvents, futureEvents, user, setUser } = props;
// need todays date formatted for conditional rendering
let today = new Date().toLocaleDateString();
useEffect(() => {
    axios.get(`http://localhost:8000/api/users/getLoggedIn`, {
        withCredentials: true
    })
    .then((res) => {
        setUser(res.data);
    })
    .catch((err)=> {
        console.log(err);
    })
}, [])

    return(
        <div className='col-8 offset-2'>
            <h2 className='fw-bold mb-3'>Future Events</h2>
            <table className='eventTable table table-striped table-hover table-primary'>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Location</th>
                        <th>Attendees</th>
                        <th>Date</th>
                        <th>Games</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='border-light'>
                    {
                        gameEvents.map((gameEvent) => {
                            return(
                                <tr className='gameEventContainer border-light' key={gameEvent._id}>
                                    <td>
                                        <Link to={`/events/${gameEvent._id}`} >
                                            {gameEvent.eventName}
                                        </Link>
                                    </td>
                                    <td>{gameEvent.streetAddress}</td>
                                    <td>{gameEvent.attendees.length}/{gameEvent.attendeeMax}</td>
                                    <td>{format(new Date(gameEvent.date), 'MMMM-dd-yyyy')}</td>
                                    <td>{gameEvent.suggestedGame}</td>
                                    {/* TODO: conditional rendering on whether user has joined or not */}
                                    {/* conditional rendering for if an event is full */}
                                    {   
                                        
                                        gameEvent.attendees.length>=gameEvent.attendeeMax ?
                                        <td>
                                            <p className='btn btn-danger'>
                                                Full
                                            </p>
                                        </td> :
                                        !gameEvent.attendees.includes(user._id) ?
                                        <td><JoinEventButton id={gameEvent._id} successCallback={() => navigate(`/events/${gameEvent._id}`)} /> </td> :
                                        <td>
                                            <UnJoinEventButton id={gameEvent._id} successCallback={() => navigate(`/events/${gameEvent._id}`)} />
                                        </td>
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default EventList;