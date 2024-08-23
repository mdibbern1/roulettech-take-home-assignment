import React, { useState } from 'react';
import axios from 'axios';

function LoginModal() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
    setIsOpen(!isOpen);
    }

    const handleLogIn = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/users/login', {
            email: event.target.email.value,
            password: event.target.password.value
        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <button onClick={toggleModal}>Log In</button>
            {isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                <h2>Log In</h2>
                <form onSubmit={handleLogIn} >
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" />
                    <button type="submit">Submit</button>
                    <button type='button' onClick={toggleModal}>Close</button>
                </form>
                </div>
            </div>
            )}
        </div>
    );
}

export default LoginModal;