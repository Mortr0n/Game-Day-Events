import { navigate } from '@reach/router';
import axios from 'axios';
import React, { useState } from 'react';


const CommentForm = (props) => {
    const { initialComment, comments, setComments, eventId } = props;
    const [ comment, setComment ] = useState(initialComment);

    const addComment = (e) => {
        e.preventDefault();
        const commentData = {
            comment: comment,
            event: eventId
        }
        console.log(comment)
        axios.post('http://localhost:8000/api/comments', commentData,
        {
            withCredentials: true,
        })
            .then((res) => {
                setComments([...comments, res.data])
                console.log(res.data);
                setComment("");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return(
        // TODO: Get comments Working
        <div className='form-group container text-start'>
            <form onSubmit={addComment}>
                <label className='mb-2 eventDetailLabels' htmlFor='comment'>Add a Comment</label>
                <input
                type="text"
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)} />
            
                <button type='submit' className='btn btn-info mt-2'>Add</button>
            </form>
        </div>
        
    )
}
export default CommentForm;