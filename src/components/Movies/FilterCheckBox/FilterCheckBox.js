import React from 'react';
import './filter-check-box/filter-check-box.css'
import tumblerMovies from '../../../images/smalltumb_on.svg'

const FilterCheckBox = () => {
    return (
        <section className="filter-check-box">
            <button className="filter-check-box__button"><img className="filter-check-box__tumbler" src={tumblerMovies} alt="Здесь должна быть картинка"/></button>
            <p className="filter-check-box__text">Короткометражки</p>
        </section>
    )
};

export default FilterCheckBox;