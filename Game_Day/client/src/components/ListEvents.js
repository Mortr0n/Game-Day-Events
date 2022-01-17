import React from 'react';
import { Link } from '@reach/router';

const EventList = (props) => {
    const { gameEvents, setGameEvents } = props;

    return(
        <div className='col-8 offset-2 '>
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
                <tbody>
                    {
                        gameEvents.map((gameEvent) => {
                            return(
                                <tr className='gameEventContainer border-warning' key={gameEvent._id}>
                                    <td>
                                        <Link to={`/events/${gameEvent._id}`} >
                                            {gameEvent.eventName}
                                        </Link>
                                    </td>
                                    <td>{gameEvent.streetAddress}</td>
                                    <td>{gameEvent.attendeeMax}</td>
                                    <td>{gameEvent.date}</td>
                                    <td>{gameEvent.suggestedGame}</td>
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
export default EventList;