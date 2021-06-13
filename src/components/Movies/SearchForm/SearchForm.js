import React from 'react';
import './search-form/search-form.css'
import searchIcon from '../../../images/search.svg';

const SearchForm = () => {
    return (
        <div>
            <div className="search-form">
                <img className="search-form__icon" src={searchIcon}/>
                <input className="search-form__text" required placeholder="Фильм"/>
                <button className="search-form__button">Найти</button>
            </div>
        </div>
    )

};

export default SearchForm;