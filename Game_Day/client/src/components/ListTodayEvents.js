import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import { format } from 'date-fns';
import JoinEventButton from './JoinEventButton';
import UnJoinEventButton from './UnJoinEventButton';

const ListTodayEvents = (props) => {
    const { gameEvents, setGameEvents, user, setUser } = props;
    const [ todaysEvents, setTodaysEvents ] = useState([]);
    // setting up a date to use for comparison to get todays events
    let today = new Date().toLocaleDateString();

    useEffect(() => {
        console.log(`gameEvents: ${gameEvents}`)
        // filtering todays events in to an array to map through later
        setTodaysEvents(gameEvents.filter(gameEvent => format(new Date(gameEvent.date), 'MMMM-dd-yyyy') === format(new Date(today), 'MMMM-dd-yyyy')));
    }, [])

    return(
        <div className='col-8 offset-2'>
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
                        todaysEvents.map((event) => {
                            return(
                                <tr key={event._id}>
                                    <td>
                                        <Link to={`/events/${event._id}`}>
                                            {event.eventName}
                                        </Link>
                                    </td> 
                                    <td>{event.city} {event.state}</td>
                                    <td>{event.attendees.length}/{event.attendeeMax} </td>
                                    <td>{format(new Date(event.date), 'MMMM-dd-yyyy')}</td>
                                    <td>{event.suggestedGame}</td>
                                    {/* TODO: conditional rendering on whether user has joined or not */}
                                    {/* conditional rendering based on whether event is full */}
                                    { 
                                        event.attendees.length>=event.attendeeMax ?
                                        <td>Full</td> :
                                        !event.attendees.includes(user._id) ?
                                        <td><JoinEventButton id={event._id} successCallback={() => navigate(`/events/${event._id}`)} /> </td> :
                                        <td>
                                            <UnJoinEventButton id={event._id} successCallback={() => navigate(`/events/${event._id}`)} />
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
export default ListTodayEvents;