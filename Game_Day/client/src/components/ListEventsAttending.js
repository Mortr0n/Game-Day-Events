import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Link, navigate } from '@reach/router';
import UnJoinEventButton from './UnJoinEventButton';



const ListEventsAttending = (props) => {
    const { user, setUser } = props;
    const [ loaded, setLoaded ] = useState(false);
    const [ eventsAttending, setEventsAttending ] = useState([]);

    // getting the user for the eventsAttending List
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/getLoggedIn`, {
            withCredentials: true
        })
        .then((res) => {
            setUser(res.data)
            console.log(res.data);
            setEventsAttending(user.eventsAttending);
            setLoaded(true);
        })
        .catch((err) => console.log(err));
    }, [])

    return(
        <>
            <h4>Future Events Attending</h4> 
            <table className='eventTable table table-secondary table-striped table-hover'>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Location</th>
                        <th>Attendees</th>
                        <th>Date</th>
                        <th>Games</th>
                        <th>Activites</th>
                    </tr>
                </thead>
                <tbody>
                    {/* checking user has been set then mapping through for the list */}
                    {   loaded &&
                    user.eventsAttending.map((event) => {
                        return(
                            <tr key={event._id}>
                                <td>
                                    <Link to={`/events/${event._id}`}>
                                        {event.eventName}
                                    </Link>
                                </td>
                                <td>{event.city} {event.state}</td>
                                <td>{event.attendees.length}/{event.attendeeMax}</td>
                                <td>{format(new Date(event.date), 'MMMM-dd-yyyy')} </td>
                                <td>{event.suggestedGame} </td>
                                <td>
                                    <UnJoinEventButton id={event._id} successCallback={() => navigate(`/events/${event._id}`)} />
                                </td>
                            </tr>
                        )
                        
                    })
                    }
                </tbody>
            </table>
                
        </>
    )
}
export default ListEventsAttending;




