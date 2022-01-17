import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

const Main = () => {

    

    return(
        <div>
            <NavBar />
            <h2 className='pageTitle'>Welcome User!</h2>
        </div>
    )
}
export default Main;