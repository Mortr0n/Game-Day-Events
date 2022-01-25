import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ListEvents from '../components/ListEvents';
import ListTodayEvents from '../components/ListTodayEvents';
import format from 'date-fns/format';

const EventList = (props) => {
    const { gameEvents, setGameEvents } = props;
    const [ loaded, setLoaded ] = useState(false);
    const [ todaysEvents, setTodaysEvents ] = useState([]);
    const [ futureEvents, setFutureEvents ] = useState([]);
    let today = new Date().toLocaleDateString();

    useEffect(() => {
        axios.get('http://localhost:8000/api/events')
            .then((res) => {
                console.log(res.data);
                setGameEvents(res.data);
                setLoaded(true);                 
            })
            .catch((err) => console.log(err));
    }, [])
    // Failed code for displaying todays events.  It almost worked but stopped after 1 in each
    // gameEvents.map((event, idx) => {
                    
    //     format(new Date(event.date), 'MMMM-dd-yyyy') === format(new Date(today), 'MMMM-dd-yyyy') ?
    //     setTodaysEvents([...todaysEvents, event]) :
    //     setFutureEvents([...futureEvents, event])
    //     setLoaded(true);
    //     console.log(futureEvents);
    //     console.log(todaysEvents);
    // })   

    const removeFromDom = (eventId) => {
        setGameEvents(gameEvents.filter(gameEvent=>gameEvent._id !== eventId));
    }

    return(
        <div>
            <NavBar />
            {/* <h1 className='pageTitle'>Upcoming Events</h1> */}
            <div className="section-title-four">
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="content">
                        <span>Upcoming Events</span>
                        <h2 className="fw-bold">Todays Events</h2>
                        {/* FIXME: Following is the failed code for displaying todays events */}
                        {/* <p className='eventHeaders'>No Events Scheduled for today.</p> */}
                        {
                            
                            loaded &&
                            <ListTodayEvents gameEvents={gameEvents} setGameEvents={setGameEvents} loaded={loaded} />
                        }
                        
                        <h3 className="gray-bg">Events</h3>
                        <h2 className='fw-bold mt-5'>Upcoming Events!</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            { loaded &&
                <ListEvents gameEvents={gameEvents} setGameEvents={setGameEvents} futureEvents={futureEvents} />
            }
        </div>
    )
}
export default EventList;