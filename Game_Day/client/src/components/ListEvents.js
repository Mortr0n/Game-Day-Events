import React from 'react';
import { Link, navigate } from '@reach/router';
import { format } from 'date-fns';
import JoinEventButton from './JoinEventButton';

const EventList = (props) => {
    const { gameEvents, setGameEvents } = props;

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
                        gameEvents.map((gameEvent) => {
                            return(
                                <tr className='gameEventContainer border-light' key={gameEvent._id}>
                                    <td>
                                        <Link to={`/events/${gameEvent._id}`} >
                                            {gameEvent.eventName}
                                        </Link>
                                    </td>
                                    <td>{gameEvent.streetAddress}</td>
                                    <td>{gameEvent.attendeeMax}</td>
                                    <td>{format(new Date(gameEvent.date), 'MMMM-dd-yyyy')}</td>
                                    <td>{gameEvent.suggestedGame}</td>
                                    <td><JoinEventButton id={gameEvent._id} successCallback={() => navigate(`/events/${gameEvent._id}`)} /> </td>
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