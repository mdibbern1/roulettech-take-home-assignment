import React, { useState, useEffect } from "react";
import axios from "axios";

const SignUpModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [formData, setFormData] = useState({
        bitcoin: { checked: false, quantity: '' },
        ethereum: { checked: false, quantity: '' },
        cardano: { checked: false, quantity: '' },
        solana: { checked: false, quantity: '' },
        polkadot: { checked: false, quantity: '' },
    });

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
        setFormData(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                checked: type === 'checkbox' ? checked : prevState[name].checked,
                quantity: type === 'number' ? value : prevState[name].quantity,
            }
        }));
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        for (const coin in formData) {
            if (formData[coin].checked && !formData[coin].quantity) {
                alert(`Please enter a quantity for ${coin}`);
                return;
            }
        }
        if(!event.target.email.value || !event.target.password.value){
            alert('Please enter an email and password');
            return;
        }
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
                                <input placeholder="Quantity" type="number" id="quantity-bitcoin" name="bitcoin" onChange={handleInputChange} disabled={!formData.bitcoin.checked} />
                            </div>
                            <div>
                                <input type="checkbox" name="ethereum" onChange={handleInputChange} />
                                <label htmlFor="ethereum">ethereum</label>
                                <input placeholder="Quantity" type="number" id="quantity-ethereum" name="ethereum" onChange={handleInputChange} disabled={!formData.ethereum.checked} />
                            </div>
                            <div>
                                <input type="checkbox" name="cardano" onChange={handleInputChange} />
                                <label htmlFor="cardano">cardano</label>
                                <input placeholder="Quantity" type="number" id="quantity-cardano" name="cardano" onChange={handleInputChange} disabled={!formData.cardano.checked} />
                            </div>
                            <div>
                                <input type="checkbox" name="solana" onChange={handleInputChange} />
                                <label htmlFor="solana">solana</label>
                                <input placeholder="Quantity" type="number" id="quantity-solana" name="solana" onChange={handleInputChange} disabled={!formData.solana.checked} />
                            </div>
                            <div>
                                <input type="checkbox" name="polkadot" onChange={handleInputChange} />
                                <label htmlFor="polkadot">polkadot</label>
                                <input placeholder="Quantity" type="number" id="quantity-polkadot" name="polkadot" onChange={handleInputChange} disabled={!formData.polkadot.checked} />
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