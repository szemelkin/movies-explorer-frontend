import React from 'react';
import { useEffect, useState, useContext } from 'react'
import './search-form/search-form.css'
import searchIcon from '../../../images/search.svg';

const SearchForm = (props) => {

    return (
        <div>
            <div className="search-form">
                <img className="search-form__icon" src={searchIcon}/>
                <input 
                    name = 'search'
                    className="search-form__text" 
                    required placeholder="Фильм"
                    onChange = {e => props.handleChange(e)} 
                />
                <button 
                    className="search-form__button" 
                    onClick={(e) => {props.handleSearchButton(e)}}
                    >Найти
                </button>
            </div>
        </div>
    )

};

export default SearchForm;