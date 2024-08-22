import React, { useState } from 'react';

const DropdownMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const [selectedCoin, setSelectedCoin] = useState(props.dropDownItems[0]);

    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="dropdown">
            <div className='dropdown-header' onClick={toggleMenu} >
                {selectedCoin}
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    {props.dropDownItems.map((coin, index) => {
                        if(coin !== selectedCoin){
                            return <li key={index} onClick={() => { props.handleSelectedCoin(coin); setSelectedCoin(coin); toggleMenu() }} ><a>{coin}</a></li>
                        }
                    })}
                </ul>
            )}
        </div>
    );
}

export default DropdownMenu;