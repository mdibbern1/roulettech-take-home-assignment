import React, { useState, useEffect, Fragment } from 'react';
import DropdownMenu from '../components/DropDownMenu';
import PriceChart from '../components/PriceChart';
import PortfolioChart from '../components/PortfolioChart';

const HomePage = (props) => {

    let user = props.user;

    const defaultCoins = [
        'Bitcoin',
        'Ethereum',
        'Cardano',
        'Solana',
        'Polkadot',
    ]

    const [selectedCoin, setSelectedCoin] = useState(user ? user.list_of_coins[0] : defaultCoins[0]);

    const  handleSelectedCoin = (coin) => {
        setSelectedCoin(coin);
    }

    return (
        <div className='homepage' >
            <div classname='content' >
                <h1>Welcome to the Cryptocurrency Portfolio Tracker!</h1>
                {!user && (
                    <Fragment>
                        <p>Track your cryptocurrency investments with ease. Below you can cycle between different cryptocurrencies and see what there daily prices have been for the past week to gain insights on the overall state of the crypto market.</p>
                        <p>Once you sign in, that graph will be replaced with one that is tracking your crypto portfolio! You can cycle between the different cryptocurrencies you own and see how that coin has performed in the past week</p>
                        <DropdownMenu handleSelectedCoin={handleSelectedCoin} dropDownItems={defaultCoins} />
                        <PriceChart selectedCoin={selectedCoin} />
                    </Fragment>
                )}
                {user && (
                    <Fragment>
                        <p>This is your crypto portfolio! Here you can see the value of your crpytocurrency! You can select your different coins from the drop down menu and the graph will update so you can see the value of the newly selected coin!</p>
                        <DropdownMenu handleSelectedCoin={handleSelectedCoin} dropDownItems={user.list_of_coins.map(coin => coin.name)} />
                        <PortfolioChart userCoins={user.list_of_coins} selectedCoin={selectedCoin} />
                    </Fragment>
                )}
            </div>
        </div>
    )
}

export default HomePage;