import React from 'react';
import './navbar.css';
import {Navbar} from 'react-bootstrap';
// @ts-ignore
import logo from '../../graphql-vision.png';

const MainNavbar: React.FC = () => {
    return (
        <Navbar className="Dash-Nav" variant="dark">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                {' GraphQL Vision'}
            </Navbar.Brand>
        </Navbar>
    );
};


export default MainNavbar;
