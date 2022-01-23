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

    useEffect(() => {
        axios.get(`http://localhost:8000/api/events/${id}`)
            .then((res) => {
                console.log(res.data);
                setGameEvent(res.data);
                setLoaded(true);    
                setComments(gameEvent.comments)            
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
                            {/* using date-fns to format date here */}
                            {format(new Date(gameEvent.date), 'MMMM-dd-yyyy')}
                            </p>
                        <p className='eventHeaders'>{gameEvent.attendeeMax}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-1'>
                    <Link className='removeTextDecoration' to={`/events/${id}/edit`}><button className='btn btn-primary mb-3 mt-3 '>Edit</button></Link>
                    <DeleteButton id={id} successCallback={() => navigate('/events/list')} />
                    </div>
                    <div className='col-3 offset-1'>
                        {/* TODO: Edit Button needs replaced with real thing */}
                        
                        <p className='eventDetailLabels fw-bold'>Event Location</p>
                        <div className='featuredEventsBox mb-5'>
                            <p className='eventDetailLabels fw-bold'>Featured Events</p>
                            <p className='eventDetailLabels'>{gameEvent.suggestedGame}</p>
                        </div>
                        
                    </div>
                    <div className='col-6'>
                        {/* TODO: Replace Delete With Real Thing */}
                        
                        <p className='eventDetailLabels'>{gameEvent.streetAddress}</p>
                        <p className='eventDetailLabels'>{gameEvent.city}, {gameEvent.state}  {gameEvent.zip}</p>
                        <p className='eventDetailLabels fw-bold'>Event Description</p>
                        <p className='eventDescriptionBox'>{gameEvent.eventDescription}</p>
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
                            <p className='thisComment ms-5 mb-2' key={thisComment._id}>
                                {thisComment.userId.firstName} - 
                            {format(new Date(thisComment.createdAt), 'MMMM-dd-hh:mm')} :   {thisComment.comment}
                            </p>
                            )
                        })
                    }
                    {/* {
                        comments &&
                        comments.map((aComment) => {
                            return(
                                <div key={comment._id}>
                                    {aComment.comment}
                                </div>
                            )
                        })
                    } */}
                    </div>
                </div>
            </div>
            
            }
            {
                loaded &&
                <CommentForm initialComment="" comments={comments} setComments={setComments} />
            }
            

        </div>
    )
}
export default EventDetails;