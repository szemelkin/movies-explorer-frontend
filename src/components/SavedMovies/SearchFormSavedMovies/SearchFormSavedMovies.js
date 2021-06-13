import React from 'react';
import { useEffect, useState, useContext } from 'react'
import './search-form/search-form.css'
import searchIcon from '../../../images/search.svg';

const SearchFormSavedMovies = (props) => {

    const [dataSearch, setDataSearch] = useState()

    
        const handleSearchInput = (e) => {
            handleChange(e)
            
            // console.log('handleSearchInput',dataSearch)
        }

        useEffect(() => {
            props.handleSearchFrase(dataSearch)
            console.log('SearchForm',dataSearch)
        },[dataSearch])


    const handleChange = (e) => {
        // console.log('e.target', e.target)
        // console.log('e.target.value', e.target.value)
        const {name, value} = e.target;
        setDataSearch(data => ({
            ...data,
            [name]:value
        }))
    }

    return (
        <div>
            <div className="search-form">
                <img className="search-form__icon" src={searchIcon}/>
                <input 
                    name = 'search'
                    className="search-form__text" 
                    required placeholder="Фильм"
                    onChange = {e => handleSearchInput(e)} 
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

export default SearchFormSavedMovies;