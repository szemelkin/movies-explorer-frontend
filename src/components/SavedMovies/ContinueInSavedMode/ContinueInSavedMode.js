import React from 'react';
import './continue/continue.css'

const ContinueInSavedMode = (props) => {

    console.log('Continue = (props)', props)

    const way = 'saved'
    function handleClickContinue() {
        props.handleClickContinueInSaveMode(props)
    }

    return (
        <div className="continue">
            <button className="continue__button" onClick = {handleClickContinue}>
                <p className="continue__text">Ещё</p>
            </button>
        </div>
    )

};

export default ContinueInSavedMode;