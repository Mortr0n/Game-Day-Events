import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Link, navigate } from '@reach/router';
import JoinEventButton from './JoinEventButton';
import UnJoinEventButton from './UnJoinEventButton';


const ListTodaysEventsAttending = (props) => {
    const { user, setUser, eventsAttending, setEventsAttending } = props;
    const [ todaysEvents, setTodaysEvents ] = useState([]);
    const [ loaded, setLoaded ] = useState(false);
    let today = new Date().toLocaleDateString();
    // getting the user for the eventsAttending List
    useEffect(() => {        
        setTodaysEvents(eventsAttending.filter(event => format(new Date(event.date), 'MMMM-dd-yyyy') === format(new Date(today), 'MMMM-dd-yyyy')));
        console.log(`Events Attending ${eventsAttending}`);
        setLoaded(true);
        
    }, [])
    
    

    return(
        <>
            <h4>Todays Events</h4> 
            <table className='eventTable table table-secondary table-striped table-hover'>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Location</th>
                        <th>Attendees</th>
                        <th>Date</th>
                        <th>Games</th>
                        <th>Activities</th>
                    </tr>
                </thead>
                <tbody>
                    {/* */}
                    {   loaded &&  
                        todaysEvents.map((myEvent) => {
                            return(
                                <tr key={myEvent._id}>
                                    <td>
                                        <Link to={`/events/${myEvent._id}`}>
                                            {myEvent.eventName}
                                        </Link>
                                    </td> 
                                    <td>{myEvent.city} {myEvent.state}</td>
                                    <td>{myEvent.attendees.length}/{myEvent.attendeeMax} </td>
                                    
                                    <td>{format(new Date(myEvent.date), 'MMMM-dd-yyyy')} </td>
                                    <td>{myEvent.suggestedGame}</td>
                                    {/* conditional rendering on whether user has joined or not */}
                                    {/* conditional rendering based on whether myEvent is full */}                                    
                                    {   
                                        
                                        myEvent.attendees.length>=myEvent.attendeeMax ?
                                        <td>
                                            <p className='btn btn-danger'>
                                                Full
                                            </p>
                                        </td> :
                                        !myEvent.attendees.includes(user._id)?
                                        <td><JoinEventButton id={myEvent._id} successCallback={() => navigate(`/events/${myEvent._id}`)} /> </td> :
                                        <td>
                                            <UnJoinEventButton id={myEvent._id} successCallback={() => navigate('/events/list')} />
                                        </td>
                                    }
                                </tr>
                            )
                        })
                    
                    }
                </tbody>
            </table>
                
        </>
    )
}
export default ListTodaysEventsAttending;