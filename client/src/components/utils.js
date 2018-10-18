import React from 'react';
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonShare } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss'

export function Button(props) {
    return (
        <AwesomeButton
            cssModule={AwesomeButtonStyles}
            type='primary'
            action={(element, next) => props.onClick(next)}
        >
            {props.title}
        </AwesomeButton>
    );
};