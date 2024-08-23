import React, { useState } from 'react';

const AboutModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <button onClick={toggleModal}>About</button>
            {isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                <h2>About</h2>
                <p>Welcome to the Cryptocurrency Portfolio Tracker! Before signing in, you can explore real-time prices for up to 5 different cryptocurrencies by selecting a coin from the dropdown menu. Once you sign in, the chart will update to reflect the total value of the cryptocurrencies in your portfolio, providing a personalized view of your holdings' worth based on current market prices. Sign in to unlock the full potential of tailored portfolio tracking!</p>
                {/* <p>This is a cryptocurrency portfolio tracker that allows users to track their cryptocurrency investments with ease. Users can cycle between different cryptocurrencies and see what their daily prices have been for the past week to gain insights on the overall state of the crypto market.</p>
                <p>Once you sign in, the graph will be replaced with one that is tracking your crypto portfolio! You can cycle between the different cryptocurrencies you own and see how that coin has performed in the past week.</p> */}
                <button type='button' onClick={toggleModal}>Close</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AboutModal;