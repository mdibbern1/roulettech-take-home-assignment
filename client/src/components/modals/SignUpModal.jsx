import React, { useState, useEffect } from "react";
import axios from "axios";

const SignUpModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        setSelectedItems([]);
    }, [])

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const handleInputChange = (event) => {
        const { name, checked, type, value } = event.target;
        let item = selectedItems.find((item) => item.name === name);
    
        if(type === 'checkbox'){
            if(checked){
                if(!item){
                    setSelectedItems([...selectedItems, { name, quantity: 0 }]);
                }
            }
            else{
                if(item){
                    setSelectedItems(selectedItems.filter((item) => item.name !== name));
                }
            }
        }
        else if(type === 'number'){
            if(item){
                setSelectedItems(selectedItems.map((item) => item.name === name ? { ...item, quantity: +value } : item));
            }
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/users/register', {
            email: event.target.email.value,
            password: event.target.password.value,
            list_of_coins: selectedItems
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
                            <input type="email" id="email" />
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" />
                            <div>
                                <input type="checkbox" name="bitcoin" onChange={handleInputChange} />
                                <label htmlFor="bitcoin">Bitcoin</label>
                                <input placeholder="Quantity" type="number" id="quantity-bitcoin" name="bitcoin" onChange={handleInputChange} />
                            </div>
                            <div>
                                <input type="checkbox" name="ethereum" onChange={handleInputChange} />
                                <label htmlFor="ethereum">ethereum</label>
                                <input placeholder="Quantity" type="number" id="quantity-ethereum" name="ethereum" onChange={handleInputChange} />
                            </div>
                            <div>
                                <input type="checkbox" name="cardano" onChange={handleInputChange} />
                                <label htmlFor="cardano">cardano</label>
                                <input placeholder="Quantity" type="number" id="quantity-cardano" name="cardano" onChange={handleInputChange} />
                            </div>
                            <div>
                                <input type="checkbox" name="solana" onChange={handleInputChange} />
                                <label htmlFor="solana">solana</label>
                                <input placeholder="Quantity" type="number" id="quantity-solana" name="solana" onChange={handleInputChange} />
                            </div>
                            <div>
                                <input type="checkbox" name="polkadot" onChange={handleInputChange} />
                                <label htmlFor="polkadot">polkadot</label>
                                <input placeholder="Quantity" type="number" id="quantity-polkadot" name="polkadot" onChange={handleInputChange} />
                            </div>
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