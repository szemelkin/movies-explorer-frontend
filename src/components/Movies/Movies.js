import React from 'react';
import { useEffect, useState } from 'react';

import './movies.css'
import SearchForm from '../Movies/SearchForm/SearchForm'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'
import FilterCheckBox from '../Movies/FilterCheckBox/FilterCheckBox'
import Continue from '../Movies/Continue/Continue'

import moviesApi from '../../utils/MoviesApi'
import mainApi from '../../utils/MainApi'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';


const Movies = (props) => {

const currentUser = React.useContext(CurrentUserContext);

console.log('Movies',currentUser)

const [renderedMovies, setRenderedMovies] = useState([])
const [continueState, setContinueState] = useState(true)

const [searchFrase, setSearchFrase] = useState('')

const [nothingToShow, setNothingToShow] = useState(false)



//Достаем данные и сохраняем в локалсторидж
const handleMoviesRequest = () => {
    moviesApi.getMovies()
        .then(res => {
            localStorage.setItem('movies', JSON.stringify(res))
        })
        .catch((err) => {console.log(err)});        
}

// const handleRequest = () => {
//     let  token  = localStorage.getItem('token')
//     mainApi.getUserInfo(token)
//         .then(res => {
//             console.log('handleRequest',res)
//             setCurrentUser(res)            
//         })
//         .catch((err) => {console.log(err)});  

//     }


useEffect(() => {
    handleMoviesRequest()
    console.log('useEffect Здесь')
    // handleRequest()
}, []) 


const handleClickContinue = () => {
    setContinueState(!continueState)
}

const handleSearch = (el) => {
    setRenderedMovies(el)
}

const handleSearchFrase = (frase) => {
    setSearchFrase(frase)
}


const handleSearchButton = (e) => {

    e.preventDefault();
    if (!searchFrase) {
        return;
    }
    handleSearchByFrase(searchFrase)
    }

const handleSearchByFrase = (searchFrase) => {
    setNothingToShow(false)
    if (!searchFrase) {
        return;
    }
    let arrayMovies = JSON.parse(localStorage.getItem('movies'))
    let arrayForRender = []

    const ru = /[а-яА-ЯЁё]/;
    if (ru.test(String(searchFrase.search))) {
        arrayMovies.forEach(element => {
            if (element.nameRU) {
                if (element.nameRU.includes(searchFrase.search)) {
                    arrayForRender.push(element)
                } else { }
        }
        setRenderedMovies(arrayForRender)
        
        
        })

        if (arrayForRender.length==0){setNothingToShow(true)}
        
    } else {
        arrayMovies.forEach(element => {
            if (element.nameEN) {
                if (element.nameEN.includes(searchFrase.search)) {
                    arrayForRender.push(element)
                } else { }
        }
        setRenderedMovies(arrayForRender)    
        })
        if (arrayForRender.length==0){setNothingToShow(true)}
    }

}

const handleSearchByFraseAndDuration = (searchFrase) => {
    setNothingToShow(false)

    if (!searchFrase) {
        return;
    }

    let arrayMovies = JSON.parse(localStorage.getItem('movies'))
    let arrayForRender = []

    //---
    const ru = /[а-яА-ЯЁё]/;
    if (ru.test(String(searchFrase.search))) {
        arrayMovies.forEach(element => {
            if (element.nameRU) {
                if (element.nameRU.includes(searchFrase.search) && (element.duration < 40)) {
                    arrayForRender.push(element)
                } else { }
        }
        setRenderedMovies(arrayForRender)
        })
        if (arrayForRender.length==0){setNothingToShow(true)}
    } else {
        arrayMovies.forEach(element => {
            if (element.nameEN) {
                if (element.nameEN.includes(searchFrase.search) && (element.duration < 40)) {
                    arrayForRender.push(element)
                } else { }
        }
        setRenderedMovies(arrayForRender)    
        })
        if (arrayForRender.length==0){setNothingToShow(true)}
    }
    //---


    // arrayMovies.forEach(element => {
    //     if (element.nameRU.includes(searchFrase.search) && (element.duration < 40)) {
    //         arrayForRender.push(element)
    //     } else { }
    //     setRenderedMovies(arrayForRender)
    // })

}


const handleShortMovies = (checkBox) => {
    if (!checkBox) {
        handleSearchByFraseAndDuration(searchFrase)
        setShowPreLoader(false)
    } else {
        handleSearchByFrase(searchFrase)
        setShowPreLoader(false)
    }
}

    return (
        <div className="movies">
            <SearchForm 
                handleMoviesRequest = {handleMoviesRequest}
                handleSearch = {handleSearch}
                handleSearchFrase = {handleSearchFrase}
                handleSearchButton = {handleSearchButton}
            />
            <FilterCheckBox 
                handleShortMovies = {handleShortMovies}
            />
            {(props.showPreLoader) && <div><Preloader /></div>}
            <MoviesCardList
                nothingToShow = {nothingToShow}
                renderedMovies = {renderedMovies}
                isSavedMovies = {false}                
            />
            <Continue 
                handleClickContinue = {handleClickContinue}
            />
        </div>
    )

};

export default Movies;