import React, { useState } from 'react';

function LoginModal() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
    setIsOpen(!isOpen);
    }

    return (
        <div>
            <button onClick={toggleModal}>Log In</button>
            {isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                <h2>Log In</h2>
                <form>
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