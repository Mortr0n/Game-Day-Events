import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

const Main = () => {

    

    return(
        <div>
            <NavBar />
            {/* <h2 className='pageTitle'>Welcome User!</h2> */}
            <div class="section-title-four">
            <div class="container">
                <div class="row mt-5">
                    <div class="col-12">
                        <div class="content">
                        <span>USER</span>
                        <h2 class="fw-bold">Your Registered Events</h2>
                        <h3 class="gray-bg">WELCOME</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Main;