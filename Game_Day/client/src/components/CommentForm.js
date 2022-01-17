import React, { useState } from 'react';


const CommentForm = (props) => {
    const { initialComment } = props;
    const [ comment, setComment ] = useState(initialComment);


    return(
        // TODO: Get comments Working
        <div className='form-group container text-start'>
            <form>
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