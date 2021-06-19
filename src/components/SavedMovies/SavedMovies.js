import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'

import '../Movies/movies.css'
import SearchFormSavedMovies from '../SavedMovies/SearchFormSavedMovies/SearchFormSavedMovies'
import SavedMoviesCardList from '../SavedMovies/SavedMoviesCardList/SavedMoviesCardList'
import FilterCheckBoxSavedMovies from '../SavedMovies/FilterCheckBoxSavedMovies/FilterCheckBoxSavedMovies'
import ContinueInSavedMode from '../SavedMovies/ContinueInSavedMode/ContinueInSavedMode'

import mainApi from '../../utils/MainApi'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const SavedMovies = (props) => {

    const currentUser = React.useContext(CurrentUserContext);

    const listOfSavedMovies = 'savedMovies'

    console.log('SavedMovies', props)

    //Запрос к базе фильмов и сохранение в массив
    function handleSavedMoviesRequest() {
        props.putAmountCardsOnScreenInSavedBlock(0)
        props.renderOfSearchSaved(4,listOfSavedMovies)
        props.setStateForActivityOfSearchingInSaveBlock
    }

    const handleShortSavedMovies = (checkBox) => {
        console.log('checkBox',checkBox)
        if (!checkBox) {
            props.filterByDurationSaved()
        } else {
            props.filterByDurationReturnSaved()
        }
    }

    //Рендер при заходе на страницу
    useEffect(() => {
        if (localStorage.getItem(listOfSavedMovies)) {
            handleSavedMoviesRequest()
        }
    }, []) 


    return (
        <div className="movies">
            <SearchFormSavedMovies 
                handleMoviesRequest = {props.handleMoviesRequest}
                handleSearch = {props.handleSearch}
                handleSearchFrase = {props.handleSearchFrase}
                handleSearchSavedMoviesButton = {props.handleSearchSavedMoviesButton}
                handleChange = {props.handleChange}
            />
            <FilterCheckBoxSavedMovies 
                handleShortSavedMovies = {handleShortSavedMovies}
            />
            <SavedMoviesCardList 
                handleDelSaveMovies = {props.handleDelSaveMovies}
                renderedMoviesInSavedBlock = {props.renderedMoviesInSavedBlock}
                renderedMovies = {props.renderedMovies}
                deleteCardFromSaved = {props.deleteCardFromSaved}
            />
            {props.isShowContinue ?
            <ContinueInSavedMode 
            handleClickContinueInSaveMode = {props.handleClickContinueInSaveMode}
            isShowContinue = {props.isShowContinue}

        /> : null}
        </div>
    )

};

export default SavedMovies;