import React from 'react';
import Login from '../components/Login';
import Register from './Register';

const LogReg = (props) => {
    const {firstName, setFirstName } = props;

    return(
        <div className='row'>
            <h1 className='pageTitle'>Game Day</h1>
            <h2 className='siteDescripter'>A free LAN and Board Gaming Event Finder and Organizer</h2>
            <div className='col-5 offset-2 mt-5'>
                <Register />
            </div>
            <div className='col-5 mt-5'>
                <Login firstName={firstName} setFirstName={setFirstName} />
            </div>
            
            
        </div>
    )
}
export default LogReg;