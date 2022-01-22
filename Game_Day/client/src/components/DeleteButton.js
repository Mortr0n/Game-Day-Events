import React from "react";
import axios from 'axios';
import { navigate } from "@reach/router";

const DeleteButton = (props) => {
    const { id, successCallback } = props;

    const deleteEvent = (e) => {
        axios.delete(`http://localhost:8000/api/events/${id}`)
            .then((res) => {
                console.log(res.data);
                successCallback();
            })
            .catch((err) =>  {
                if(err.response.status === 401) {
                    navigate('/events')
                } 
                console.log(err.response);
            });
    }

    return(
        <button className="btn btn-danger" onClick={deleteEvent}>
            Delete
        </button>
    )
}
export default DeleteButton;