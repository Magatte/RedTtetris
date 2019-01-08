import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-bojack.css';;

const Menu = (props) => {

    return (
        <div className='start'>
            <div className='menu-button'>
                <AwesomeButton
                    type="primary"
                    size="medium"
                    action={() => props.loadGame()}
                >
                    START
                </AwesomeButton>
            </div>
            <div className='menu-button'>
                <AwesomeButton
                    type="primary"
                    size="medium"
                    action={() => props.pauseGame()}
                >
                    {props.pauseTitle}
                </AwesomeButton>
            </div>
        </div>
    );
}

export default Menu;