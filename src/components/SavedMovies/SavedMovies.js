import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'

import '../Movies/movies.css'
import SearchFormSavedMovies from '../SavedMovies/SearchFormSavedMovies/SearchFormSavedMovies'
import SavedMoviesCardList from '../SavedMovies/SavedMoviesCardList/SavedMoviesCardList'
import FilterCheckBoxSavedMovies from '../SavedMovies/FilterCheckBoxSavedMovies/FilterCheckBoxSavedMovies'

import mainApi from '../../utils/MainApi'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const SavedMovies = (props) => {

    const [renderedSavedMovies, setRenderedSavedMovies] = useState([])
    const [searchFraseSavedMovies, setSearchFraseSavedMovies] = useState('')


    const [nothingToShowInSavedMoviesSearch, setNothingToShowInSavedMoviesSearch] = useState(false)

    const currentUser = React.useContext(CurrentUserContext);
    console.log('SavedMovies',currentUser)

    //Запрос к базе фильмов и сохранение в массив
    function handleSavedMoviesRequest() {

        mainApi.getSavedMovies()
            .then(res => {
                let arrayForRenderByOwnId = []
                res.forEach(element => {
                    console.log('element.owner', element.owner)
                    console.log('currentUser._id', currentUser._id)
                    if (element.owner === currentUser._id) {
                        arrayForRenderByOwnId.push(element)
                    }
                })
                setRenderedSavedMovies(arrayForRenderByOwnId)
                // console.log(res)
            })
            .catch((err) => {console.log(err)});        
    }



    //Рендер при заходе на страницу
    useEffect(() => {
        handleSavedMoviesRequest()
        console.log('handleSavedMoviesRequest',renderedSavedMovies)
        console.log('CurrentUserContext',currentUser)

    }, []) 


    //РеРендер после удаления карточки
    function handleRerenderAfterDel() {
        handleSavedMoviesRequest()
    }



    //Подгрузка слова из компонента Search

    const handleSearchFrase = (frase) => {
        setSearchFraseSavedMovies(frase)
    }
    
    
    //Обработка поиска по фразе
    const handleSearchByFrase = (searchFraseSavedMovies) => {

        setNothingToShowInSavedMoviesSearch(true)
        if (!searchFraseSavedMovies) {
            return;
        }

        let arraySavedMoviesForRender = []


        const ru = /[а-яА-ЯЁё]/;
            if (ru.test(String(searchFraseSavedMovies.search))) {
                renderedSavedMovies.forEach(element => {
                    if (element.nameRU) {
                        if (element.nameRU.includes(searchFraseSavedMovies.search)) {
                            arraySavedMoviesForRender.push(element)
                        } else { }
                }
                setRenderedSavedMovies(arraySavedMoviesForRender)
                })
                // if (!arrayForRender || arrayForRender.length==0){setNothingToShowInSavedMoviesSearch(true)}
            } else {
                renderedSavedMovies.forEach(element => {
                    if (element.nameEN) {
                        if (element.nameEN.includes(searchFraseSavedMovies.search)) {
                            arraySavedMoviesForRender.push(element)
                        } else { }
                }
                setRenderedSavedMovies(arraySavedMoviesForRender)    
                })
                // if (!arrayForRender || arrayForRender.length==0){setNothingToShowInSavedMoviesSearch(true)}
            }




        }
    
    //Обработка поиска по фразе и продолжительности
    const handleSearchByFraseAndDuration = (searchFraseSavedMovies) => {

        setNothingToShowInSavedMoviesSearch(true)
        console.log('Сюда приходим, чтобы найти только короткометражки', searchFraseSavedMovies)
        // if (!searchFraseSavedMovies) {
        //     return;
        // }

        let arraySavedMoviesForRender = []

        console.log('Сюда приходим, чтобы найти только короткометражки')
        const ru = /[а-яА-ЯЁё]/;

        if (searchFraseSavedMovies) {
            console.log('searchFraseSavedMovies',searchFraseSavedMovies)
            // Случай, когда есть фраза в строке
            if (ru.test(String(searchFraseSavedMovies.search))) {
                renderedSavedMovies.forEach(element => {
                    if (element.nameRU) {
                        if (element.nameRU.includes(searchFraseSavedMovies.search) && (element.duration < 40)) {
                            arraySavedMoviesForRender.push(element)
                        } else { }
                }
                setRenderedSavedMovies(arraySavedMoviesForRender)
                })
                if (arrayForRender.length==0){setNothingToShowInSavedMoviesSearch(true)}
            } else {
                renderedSavedMovies.forEach(element => {
                    if (element.nameEN) {
                        if (element.nameEN.includes(searchFraseSavedMovies.search) && (element.duration < 40)) {
                            arraySavedMoviesForRender.push(element)
                        } else {}
                }
                setRenderedSavedMovies(arraySavedMoviesForRender)    
                })
                // if (!arrayForRender || arrayForRender.length==0){setNothingToShowInSavedMoviesSearch(true)}
            }
        } else {
            // Случай, когда нет фразы в строке
            console.log('searchFraseSavedMovies Строка поиска пустая',searchFraseSavedMovies)
            console.log('renderedSavedMovies',renderedSavedMovies)
            renderedSavedMovies.forEach(element => {
            if ((element.duration < 40)) {
                arraySavedMoviesForRender.push(element)
            }
            setRenderedSavedMovies(arraySavedMoviesForRender)    
            })    
            // if (!arrayForRender || arrayForRender.length==0){setNothingToShowInSavedMoviesSearch(true)}
        }
    }

    //Обработка нажатия на кнопку поиск
    const handleSearchButton = (e) => {
        
        e.preventDefault();
        if (!searchFraseSavedMovies) {
            return;
        }
        handleSearchByFrase(searchFraseSavedMovies)
        }


    //Обработка нажатия на тумблер
    const handleShortSavedMovies = (checkBox) => {
        if (!checkBox) {
            console.log('Будем искать короткие', checkBox)
            handleSearchByFraseAndDuration(searchFraseSavedMovies)
        } else {
            console.log('Пришли отменять короткие фильмыб ',searchFraseSavedMovies)
            if (searchFraseSavedMovies) {
                handleSavedMoviesRequest()
                setSearchFraseSavedMovies('')
            }
            else {
                handleSavedMoviesRequest()
                setSearchFraseSavedMovies('')
            }
        }
    }

    // useEffect(() => {
    //     handleShortSavedMovies
    // },[checkBox])


    return (
        <div className="movies">
            <SearchFormSavedMovies 
                handleSavedMoviesRequest = {handleSavedMoviesRequest}
                handleSearchFrase = {handleSearchFrase}
                handleSearchButton = {handleSearchButton}
            />
            <FilterCheckBoxSavedMovies 
                handleShortSavedMovies = {handleShortSavedMovies}
            />
            <SavedMoviesCardList 
                renderedSavedMovies = {renderedSavedMovies}
                handleRerenderAfterDel = {handleRerenderAfterDel}
                nothingToShowInSavedMoviesSearch = {nothingToShowInSavedMoviesSearch}
            />
        </div>
    )

};

export default SavedMovies;