import React from 'react';
import { useEffect, useState } from 'react';

import './filter-check-box/filter-check-box.css'
import tumblerMoviesOn from '../../../images/smalltumb_on.svg'
import tumblerMoviesOff from '../../../images/smalltumb_off.svg'

const FilterCheckBoxSavedMovies = (props) => {

    const [checkBox, setCheckBox] = useState(false)

    const handleCheckBox = () => {
        setCheckBox(!checkBox)
        props.handleShortSavedMovies(checkBox)
    }       
    
    const checkBoxSrc = () => {
        if (!checkBox) {return tumblerMoviesOn} else {return tumblerMoviesOff}
    }; 


    return (
        <section className="filter-check-box">
            <button onClick = {handleCheckBox} className="filter-check-box__button"><img className="filter-check-box__tumbler" src={checkBoxSrc()} alt="Здесь должна быть картинка"/></button>
            <p className="filter-check-box__text">Короткометражки</p>
        </section>
    )
};

export default FilterCheckBoxSavedMovies;