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
    const [ comments, setComments ] = useState([]);
    const [ user, setUser ] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/events/${id}`)
            .then((res) => {
                console.log(res.data);
                setGameEvent(res.data);
                axios.get('http://localhost:8000/api/users/getLoggedIn', {
                    withCredentials: true
                })
                    .then((res) => {
                        console.log(res.data);
                        setUser(res.data);
                        console.log(`User is : ${user.firstName}`)
                        setLoaded(true);
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))         
            
        
    }, [comments])

    return(
        <div>
            <NavBar />
            { 
            loaded &&
            <div className='container wrapper '>
            
                <div className='row eventDetailsTop mt-2'>
                    <h2 className='pageTitle'>{gameEvent.eventName}</h2>
                    {
                        gameEvent.userId &&
                        <div>
                            <p className='eventDetailLabels fw-bold'>Event Host: {gameEvent.userId.firstName} {gameEvent.userId.lastName}</p>
                            <p className=''>Contact at: {gameEvent.userId.email}</p>
                        </div>
                    }
                    <div className='col-3 offset-2'>
                        <p className='eventHeaders'>Event Date</p>
                        <p className='eventHeaders'>Attending</p>
                    </div>
                    <div className='col-6'>
                        <p className='eventHeaders'>
                            {format(new Date(gameEvent.date), 'MMMM-dd-yyyy')}
                            </p>
                        <p className='eventHeaders'>{gameEvent.attendees.length} /{gameEvent.attendeeMax}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='row location'>
                        <div className='col-3 offset-1'>
                            <p className='eventDetailLabels fw-bold whiteText'>Event Location</p>
                        </div>
                        <div className='col-5 offset-3'>
                            <p className='eventDetailLabels whiteText'>{gameEvent.streetAddress}</p>
                            <p className='eventDetailLabels whiteText'>{gameEvent.city}, {gameEvent.state}  {gameEvent.zip}</p>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='featuredEventsBox mb-5 mt-5'>
                            <p className='eventDetailLabels fw-bold whiteText'>Featured Events</p>
                            <p className='eventDetailLabels whiteText'>{gameEvent.suggestedGame}</p>
                        </div>
                        
                    </div>
                    <div className='col-6 offset-3'>
                        <p className='eventDetailLabels fw-bold'>Event Description</p>
                        <p className='eventDescriptionBox'>{gameEvent.eventDescription}</p>
                        {/* Only show edit/delete if logged in user is the event creator */}
                        {   loaded &&(
                            (gameEvent.userId._id===user._id && loaded) &&
                            <div className='row mt-4'>
                                
                                <div className='col-3 offset-5'>
                                    <Link className='removeTextDecoration' to={`/events/${id}/edit`}><button className='btn btn-secondary btn-sm mb-3 mt-3 '>Edit Event</button></Link>
                                </div>
                                <div className='col-2 mt-3'>
                                    <DeleteButton id={id} successCallback={() => navigate('/events/list')} />
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                <div className='row text-start'>
                    <p className='eventDetailLabels fst-italic'>Comments</p>
                    <div className='commentsBox justify-content-center '>
                    {
                        // making sure there are comments and then reversing order to newest first
                        gameEvent.comments &&
                        gameEvent.comments.slice(0).reverse().map((thisComment) => {
                            return(
                            <div className='thisComment ms-5 mb-2' key={thisComment._id}>
                                <span className='bold italic blue'>{thisComment.userId.firstName}</span> -  
                            <span className='bold'>{format(new Date(thisComment.createdAt), ' MMMM-dd-hh:mm')}</span> -- {thisComment.comment}
                            </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            }
            {
                loaded &&
                <CommentForm eventId={gameEvent._id} initialComment="" comments={comments} setComments={setComments} />
            }
            

        </div>
    )
}
export default EventDetails;