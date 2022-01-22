import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, navigate } from '@reach/router';
import Arrows from '../assets/Arrows.png';
import axios from "axios";

const NewNav = () => {
    const logout = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/logout', {
            // no body required for logout
        }, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            navigate('/events');
        })
        .catch((err) => console.log(err));
    }

    return (
    <section className="navbar-area navbar-one">
        <div className="container">
        <div className="row">
            <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg">
                <ul className="navbar-nav m-auto">
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
                <div className="navbar-btn d-none d-sm-inline-block">
                    <ul>
                        <li>
                            <Link to={'/logout'}>
                                <a type="submit" className="btn primary-btn-outline" onClick={(e) => logout(e)}>
                                    Logout
                                </a>
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </nav>
            </div>
        </div>
        </div>
    </section>
    );
};

export default NewNav;
