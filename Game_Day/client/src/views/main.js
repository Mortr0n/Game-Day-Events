import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

const Main = (props) => {
    const { user, setUser } = props;
    // const [ userFirstName, setUserFirstName ] = useState("");
    // const [ userLastName, setUserLastName ] = useState("");




    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/getLoggedIn`, {
            withCredentials: true
        })
        .then((res) => {
            setUser(res.data)
        })
        .catch((err) => console.log(err));
    }, [])
    

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Main;