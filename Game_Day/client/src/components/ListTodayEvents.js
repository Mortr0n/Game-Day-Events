import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import { format } from 'date-fns';
import JoinEventButton from './JoinEventButton';

const ListTodayEvents = (props) => {
    const { gameEvents, setGameEvents, loaded } = props;
    const [ todaysEvents, setTodaysEvents ] = useState([]);

let today = new Date().toLocaleDateString();
// gameEvents.map((event) => {
//     format(new Date(event.date), 'MMMM-dd-yyyy') === format(new Date(today), 'MMMM-dd-yyyy') &&
//     setTodaysEvents([...todaysEvents, event])
    // console.log(todaysEvents);
    // return todaysEvents;
    useEffect(() => {
        setTodaysEvents(gameEvents.filter(gameEvent => format(new Date(gameEvent.date), 'MMMM-dd-yyyy') === format(new Date(today), 'MMMM-dd-yyyy')));
        console.log(todaysEvents);
    }, [])




// below line will find out if the event is today for moving it to a different table
// format(new Date(gameEvent.date), 'MMMM-dd-yyyy') === format(new Date(today), 'MMMM-dd-yyyy') ?

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
                                    <td>{event.eventName}</td>
                                    <td>{event.attendees.length}/{event.attendeeMax} </td>
                                    <td>{event.streetAddress}</td>
                                    <td>{format(new Date(event.date), 'MMMM-dd-yyyy') }</td>
                                    <td>{event.suggestedGame}</td>
                                    <td>JOIN</td>
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