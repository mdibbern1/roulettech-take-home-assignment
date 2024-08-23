import React, { useState } from "react";
import axios from "axios";

const SignUpModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [list_of_coins, setList_of_coins] = useState([]);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log('Email:', email);
        console.log('Password:', password);
        axios.post('http://127.0.0.1:8000/users/register', {
            email: event.target.email.value,
            password: event.target.password.value,
            list_of_coins: [{
                coin_name: "bitcoin",
                ammount: 100
            }]
        }).then((response) => {
            if(response.status == 200){
                toggleModal();
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <button onClick={toggleModal}>Sign Up</button>
            {isOpen &&  (
                <div className="modal-overlay">
                    <div className="modal-content">
                    <h2>Sign Up</h2>
                        <form onSubmit={handleSignUp} >
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" onChange={() => {}} />
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

export default SignUpModal;