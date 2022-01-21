import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from '@reach/router';
import Arrows from '../assets/Arrows.png';

const NewNav = () => {
    return (
    <section class="navbar-area navbar-one">
        <div class="container">
        <div class="row">
            <div class="col-lg-12">
            <nav class="navbar navbar-expand-lg">
                <ul class="navbar-nav m-auto">
                <li className="nav-item mt-3">
                    <img className="mt-2" src={Arrows} alt="Arrows Swirling" />
                </li>
                <Link to={'/events'} className='m-auto'>
                    
                    <li >
                        <Navbar.Brand id="gameDayNav">Game Day</Navbar.Brand>
                    </li>
                </Link>
                    <li className="nav-item">
                        <Link to={'/events/home'}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/events/new'}>New</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={'/events/list'}>Events</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={'/user/id'}>Account</Link>
                    </li>
                </ul>
            </nav>
            </div>
        </div>
        </div>
    </section>
    );
};

export default NewNav;
