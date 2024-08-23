import React from 'react';
import LoginModal from './modals/LoginModal';
import SignUpModal from './modals/SignUpModal';

const NavHeader = (props) => {
    return (
        <nav className="navbar">
            <h3 className="navbar-title">Cryptocurrency Portfolio Tracker</h3>
            <ul className='nav-links' >
                <li>
                    <LoginModal handleUserLogin={props.handleUserLogin} />
                </li>
                <li>
                    <SignUpModal />
                </li>
                <li>
                    <button>About</button>
                </li>
            </ul>
        </nav>
    );
}

export default NavHeader;