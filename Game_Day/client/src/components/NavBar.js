import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from '@reach/router';


const NavBar = () => {
    



    return(
        <Navbar bg="primary" expand="lg">
            <Container>
                <Navbar.Brand className="m-auto" href="#home">Game Day Events</Navbar.Brand>
                <Nav variant="pills" className="m-auto">
                    <Link className='navLinks' to={'/events'}>
                        <Navbar.Brand >Home</Navbar.Brand>
                    </Link>
                    <Link className='navLinks' to={'/events/new'}>
                        <Navbar.Brand >New</Navbar.Brand>
                    </Link>
                    <Link className='navLinks' to={'/events/list'}>
                        <Navbar.Brand >Events</Navbar.Brand>
                    </Link>
                    <Link className='navLinks' to={`/user/detail/:userIDHere`}>
                        <Navbar.Brand >Account</Navbar.Brand>
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default NavBar;