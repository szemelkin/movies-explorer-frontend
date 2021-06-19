import React from 'react';
import { useEffect, useState } from 'react';

import './movies.css'
import SearchForm from '../Movies/SearchForm/SearchForm'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'
import FilterCheckBox from '../Movies/FilterCheckBox/FilterCheckBox'
import Continue from '../Movies/Continue/Continue'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';


const Movies = (props) => {

const currentUser = React.useContext(CurrentUserContext);

console.log('Movies props',props)

const handleShortMovies = (checkBox) => {
    if (!checkBox) {
        props.filterByDuration()
    } else {
        props.filterByDurationReturn()
    }
}

const listOfFoundedMovies = 'searchResultOfMovies'

function handleMoviesRequest() {
    console.log('Movies = (props) ',props)
    props.putAmountCardsOnScreen(0)
    props.renderOfSearch(4,listOfFoundedMovies)
}

useEffect(() => {
    if (localStorage.getItem(listOfFoundedMovies)) {
        handleMoviesRequest()
    }
}, []) 


    return (
        <div className="movies">
            <SearchForm 
                handleMoviesRequest = {props.handleMoviesRequest}
                handleSearch = {props.handleSearch}
                handleSearchFrase = {props.handleSearchFrase}
                handleSearchButton = {props.handleSearchButton}
                handleChange = {props.handleChange}
            />
            <FilterCheckBox 
                handleShortMovies = {handleShortMovies}
            />

            <MoviesCardList
                nothingToShow = {props.nothingToShow}
                handleSaveMovies = {props.handleSaveMovies}
                isSavedMovies = {props.isSavedMovies}
                renderedMovies = {props.renderedMovies}
                handleClickOnLikeButton = {props.handleClickOnLikeButton}
                isInSaved = {props.isInSaved}
                isSaved = {props.isSaved}
                arrayForRenderWithRespectToScreenToList = {props.arrayForRenderWithRespectToScreenToList}     
            />
            {props.isShowContinue ?
            <Continue 
                handleClickContinue = {props.handleClickContinue}
                // countCardsForRendering2 = {countCardsForRendering2}   
                isShowContinue = {props.isShowContinue}

            /> : null}
        </div>
    )

};

export default Movies;