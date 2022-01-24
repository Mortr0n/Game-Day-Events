import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import ListEventsAttending from '../components/ListEventsAttending';

const Main = (props) => {
    const { user, setUser } = props;
    const [ loaded, setLoaded ] = useState(false);



    return(
        <div>
            <NavBar />
            {/* <h2 className='pageTitle'>Welcome User!</h2> */}
            <div className="section-title-four">
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="content">
                        <span>Welcome</span>
                        <h2 className="fw-bold">{user.firstName} {user.lastName}</h2>
                        <h3 className="gray-bg">WELCOME</h3>
                        <ListEventsAttending user={user} setUser={setUser} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Main;