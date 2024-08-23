import React, { useState } from 'react';
import LoginModal from './modals/LoginModal';
import SignUpModal from './modals/SignUpModal';
import AboutModal from './modals/AboutModal';

const NavHeader = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSetUserLoggIn = () => {
        setLoggedIn(!loggedIn);
    }

    return (
        <nav className="navbar">
            <h3 className="navbar-title">Cryptocurrency Portfolio Tracker</h3>
            <ul className='nav-links' >
                <li>
                    {loggedIn ? <button onClick={() => { handleSetUserLoggIn(); props.handleUserLogin(null) }} >Log Out</button> : <LoginModal handleSetUserLoggIn={handleSetUserLoggIn} handleUserLogin={props.handleUserLogin} />}
                </li>
                <li>
                    {!loggedIn && <SignUpModal />}
                </li>
                <li>
                    <AboutModal />
                </li>
            </ul>
        </nav>
    );
}

export default NavHeader;