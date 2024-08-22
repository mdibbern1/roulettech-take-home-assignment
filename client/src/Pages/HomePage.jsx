import React, { useState } from 'react';
import DropdownMenu from '../components/DropDownMenu';
import PriceChart from '../components/PriceChart';

const HomePage = (props) => {

    const defaultCoins = [
        'Bitcoin',
        'Ethereum',
        'Cardano',
        'Solana',
        'Polkadot',
    ]

    const [selectedCoin, setSelectedCoin] = useState(defaultCoins[0]);

    function handleSelectedCoin(coin){
        setSelectedCoin(coin);
    }

    return (
        <div className='homepage' >
            <div classname='content' >
                <h1>Welcome to the Cryptocurrency Portfolio Tracker!</h1>
                <p>Track your cryptocurrency investments with ease. Below you can cycle between different cryptocurrencies and see what there daily prices have been for the past week to gain insights on the overall state of the crypto market.</p>
                <p>Once you sign in, that graph will be replaced with one that is tracking your crypto portfolio! You can cycle between the different cryptocurrencies you own and see how that coin has performed in the past week</p>
                <DropdownMenu handleSelectedCoin={handleSelectedCoin} dropDownItems={defaultCoins} />
                <PriceChart selectedCoin={selectedCoin} />
            </div>
        </div>
    )
}

export default HomePage;