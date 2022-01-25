import React from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const JoinEventButton = (props) => {
    const { id, successCallback } = props;

    const joinEvent = (e) => {
        axios.put(`http://localhost:8000/api/users/attendEvent/`,{
            id: id
        }, {
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data);
                successCallback();
            })
            .catch((err) => {
                if(err.response.status === 401) {
                    navigate('/events')
                }
                console.log(err.response);
            });
    }

    return(
        <button className='btn btn-primary btn-sm' onClick={joinEvent}>
            Join
        </button>
    )
}
export default JoinEventButton;