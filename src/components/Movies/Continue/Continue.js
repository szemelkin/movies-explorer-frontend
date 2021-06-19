import React from 'react';
import './continue/continue.css'

const Continue = (props) => {

    console.log('Continue = (props)', props)


    return (
        <div className="continue">
            <button className="continue__button" onClick = {props.handleClickContinue}>
                <p className="continue__text">Ещё</p>
            </button>
        </div>
    )

};

export default Continue;