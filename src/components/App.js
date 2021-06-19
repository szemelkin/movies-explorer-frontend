import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { Route, Switch, useHistory} from 'react-router-dom';

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Movies from '../components/Movies/Movies';
import Footer from '../components/Footer/Footer';
import Profile from '../components/Profile/Profile';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import SavedMovies from '../components/SavedMovies/SavedMovies';
import ProtectedRoute from './ProtectedRoute';

import mainApi from '../utils/MainApi'
import moviesApi from '../utils/MoviesApi'

import * as auth from '../utils/auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

    // const currentUser = React.useContext(CurrentUserContext);
    
    const [showPreLoader, setShowPreLoader] = useState(false)

    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();


    const [renderedMovies, setRenderedMovies] = useState([])
    const [continueState, setContinueState] = useState(true)

    const [searchFrase, setSearchFrase] = useState('')
    const [nothingToShow, setNothingToShow] = useState(false)
    const [isShowContinue, setIsShowContinue] = useState(true)

    const [arrayForRenderWithRespectToScreenToList, setArrayForRenderWithRespectToScreenToList] = useState([])

    const [dataSearch, setDataSearch] = useState('')

    const [isSavedMovies, setIsSavedMovies] = useState(false)


    const [renderedMoviesInSavedBlock, setRenderedMoviesInSavedBlock] = useState([])


    const listOfSavedMovies = 'savedMovies'
    const SaveSearchMoviesFromApi = 'searchResultOfMovies'
    const SaveSearchMoviesFromSavedMovies = 'searchResultOfSavedMovies'
    const listOfMovies = 'movies'

    const [currentUser, setCurrentUser] = React.useState([{
        name:'',
        email:''
    }])

    let amountCardsOnScreen = 0

    const initialData = {
        name: '',
        email: '',
        };    

//-----------------------------

useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))

}, []);

useEffect(() =>{
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    handleMoviesRequest()
    handleSavedMoviesRequest()
},[currentUser])

//Достаем данные и сохраняем в локалсторидж
function handleSavedMoviesRequest() {
    // console.log('Выгрузили сохраненные фильмы')
    mainApi.getSavedMovies()
        .then(res => {
            let arrayForSavedMoviesOfParticularOwner = []
            res.forEach((element) => {

                if (element.owner == currentUser._id) {

                    arrayForSavedMoviesOfParticularOwner.push(element)
                }
            })
            localStorage.setItem('savedMovies', JSON.stringify(arrayForSavedMoviesOfParticularOwner))
        })
        .catch((err) => {console.log(err)});        
}

//Достаем сохраненные фильмы и сохраняем в локалсторидж
const handleMoviesRequest = () => {
    moviesApi.getMovies()
        .then(res => {
            localStorage.setItem('movies', JSON.stringify(res))
        })
        .catch((err) => {console.log(err)});        
}


//------------------------------
//Выгружаем даные о пользователе

function getUserContext() {
    setShowPreLoader(true)
    let token = localStorage.getItem('token');
    mainApi.getUserInfo(token)
    .then(res => {
        setCurrentUser(res)
    })
    .catch((err) => {console.log(err)})
    .finally(setShowPreLoader(false))
}
    
const tokenCheck = () => {
    const token = localStorage.getItem('token');      
    if (token) {
            // console.log('Был токен')
            setLoggedIn(true);    
            handleMoviesRequest()
            handleSavedMoviesRequest()
            history.push('/');
            renderOfSearch(4, SaveSearchMoviesFromApi)
            renewUserContextAfterPatching()
        } else {
            // console.log('Не было токена')

            // console.log('User context', currentUser)

            
        }
}
    
useEffect(() => {
    tokenCheck();

}, []);


//-----------------------------
//ОБРАБОТЧИКИ ДЛЯ MOVIES

//Обработка нажатия кнопки "Поиск"
function handleSearchButton(e) {
    e.preventDefault();
    setRenderedMovies([])
    handleSearchByFrase(dataSearch, listOfMovies, SaveSearchMoviesFromApi)    
    putAmountCardsOnScreen(0)
    renderOfSearch(4, SaveSearchMoviesFromApi)
}

function handleClickContinue(data) {
    if ( (amountCardsOnScreen + 4) > getDataForRenderFromLocalStorage('searchResultOfMovies').length) {
        setIsShowContinue(false)
    } else {    
    renderOfSearch(4, SaveSearchMoviesFromApi)
    }
}

//Проверяем есть ли фильм в сохраненных
function checkIfMovieInSaved(userId, filmId) {
    let a = JSON.parse(localStorage.getItem('savedMovies'))
    // console.log(a)
    if (a) {
        a.forEach((element) => {
            if (element.movieId == filmId && element.owner == userId) {
                // console.log('Таклй фильм уже сохранен')
            } else {console.log('Кажется сохраненых фильмов нет')}
        })
    } else {console.log('Кажется сохраненых фильмов нет')}
}

//Отправляем фильм на сохранение
function handleSaveMovies(card) {
    checkIfMovieInSaved({
        userId: currentUser._id,
        filmId: card.id
    })
    mainApi.postSavedMovies(card)
    .then(
        handleSavedMoviesRequest()
        )    
}



//-----------------------------


//-----------------------------
//ОБРАБОТЧИКИ ДЛЯ SAVE-MOVIES
const [activityOfSearchingInSaveBlock,setActivityOfSearchingInSaveBlock] = useState(false)

function handleSearchSavedMoviesButton(e) {
    e.preventDefault();
    putAmountCardsOnScreenInSavedBlock(0)
    setRenderedMovies([])
    setActivityOfSearchingInSaveBlock(true)
    handleSearchByFrase(dataSearch, listOfSavedMovies, SaveSearchMoviesFromSavedMovies)    
    putAmountCardsOnScreen(0)
    renderOfSearchSaved(4, SaveSearchMoviesFromSavedMovies)
}

function handleClickContinueInSaveMode(data) {
    // putAmountCardsOnScreenInSavedBlock(arrayForRenderInSaveMode.length)
    if ( (amountCardsOnScreen + 4) > getDataForRenderFromLocalStorage('savedMovies').length) {
        setIsShowContinue(false)
    } else {    
        if (activityOfSearchingInSaveBlock) {
            renderOfSearchSaved(4, SaveSearchMoviesFromSavedMovies)
        } else {
            renderOfSearchSaved(4, listOfSavedMovies)
        }
    }
}


function setStateForActivityOfSearchingInSaveBlock() {
    setActivityOfSearchingInSaveBlock(false)
    // console.log('setActivityOfSearchingInSaveBlock', activityOfSearchingInSaveBlock)
}



function handleDelSaveMovies(card) {
    // console.log('Нажали удалить',card)
    mainApi.delSavedMovies(card)
    handleSavedMoviesRequest()
    let arrayMovies = JSON.parse(localStorage.getItem(listOfSavedMovies))
    renderOfSearchSaved(4, listOfSavedMovies)
    // renderOfSearchSaved(4,listOfSavedMovies)    
    // console.log(card)
}


//-----------------------------



//-----------------------------
//ОБРАБОТЧИКИ ДЛЯ SIGNOUT

//Выход из приложения при нажатии кнопки "Выход"
function handleSignOut() {
    // Удаляем токен из локального хранилища при логауте
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    // Возвращаем пользовательские данные к начальному состоянию
    setCurrentUser(initialData);
    setLoggedIn(false);
    // Перенаправляем пользователя на страницу логина
    history.push('/');
}

//-----------------------------


//-----------------------------
//ОБРАБОТЧИКИ ДЛЯ SIGNIN


//Обработка логина в систему
const handleLogin = ({ email, password }) => {
    setShowPreLoader(true)
    return auth.authorize(email, password)
    .then(res => {
        if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
            if (res.token) {      
                setLoggedIn(true);                
                localStorage.setItem('token', res.token);
                mainApi.getUserInfo(res.token)
                    .then(res => {
                        // console.log('setCurrentUser(res)', res)
                        setCurrentUser(res)
                        // console.log('setCurrentUser', currentUser)
                        history.push('/');
                })
                .catch((err) => {console.log(err)});  
    
        }
        })
        
        .then(() => history.push('/'))
        .finally(setShowPreLoader(false))
    }    

//-----------------------------


//-----------------------------
//ОБРАБОТЧИКИ ДЛЯ REGISTER

//Обработка регистрации
const handleRegister = ({name, email, password}) => {
    setShowPreLoader(true)
    return auth.register(name, email, password)
    .then(res => {
        if (!res || res.statusCode === 400) {
            new Error('Что-то пошло не так!');            
        }
        if (res) {
        return res;
        }
    })
    .catch((err)=>{
        console.log(`Ошибка при загрузке данных пользователя: ${err}`)
    })
    .finally(setShowPreLoader(false))

}

//-----------------------------------------------------------------------------------------------------------------


//-----------------------------
//ОБРАБОТЧИКИ ДЛЯ PROFILE
//Обработка обновления данных пользователя    
const handleRenewUser = (data) => {
    setShowPreLoader(true)
    return mainApi.renewUserInfo(data)
    .then(res => {
        if (!res || res.statusCode === 400) {
            new Error('Что-то пошло не так!');            
        }
        if (res) {
            // console.log('renewUserContextAfterPatching Пошли обновлять контекст')
            renewUserContextAfterPatching()
        return res;
        
        }
    })
    .catch((err)=>{
        console.log(`Ошибка при загрузке данных пользователя: ${err}`)
    })
    .finally(setShowPreLoader(false))

}
//Обновление контекста пользователя после обновления данных о пользователе
function renewUserContextAfterPatching() {
    let token = localStorage.getItem('token');
    mainApi.getUserInfo(token)
        .then(res => {
        setCurrentUser(res)                
    })
    .catch((err) => {console.log(err)});
    
}

//-----------------------------



//-----------------------------------------------------------------------------------------------------------------
//ОБЩИЕ ФУНКЦИИ



//Поиск по фразе

function handleSearchByFrase(searchFrase, listOfDataWhereWeSearch, listOfDataWhereWeSaveResultOfSearch) {
    setIsShowContinue(true)
    setNothingToShow(false)
    if (!searchFrase) {
        return;
    }
    let arrayMovies = JSON.parse(localStorage.getItem(listOfDataWhereWeSearch))
    let resultOfSearch = []
    const ru = /[а-яА-ЯЁё]/;
    //Проверяем язык
    if (ru.test(String(searchFrase.search))) {
        arrayMovies.forEach(element => {
            if (element.nameRU) {
                if (element.nameRU.includes(searchFrase.search)) {
                    resultOfSearch.push(element)
                } else { }
        }   
        })        
    } else {
        arrayMovies.forEach(element => {
            if (element.nameEN) {
                if (element.nameEN.includes(searchFrase.search)) {
                    resultOfSearch.push(element)
                } else { }
        }

        })
    }
    localStorage.setItem(listOfDataWhereWeSaveResultOfSearch, JSON.stringify(resultOfSearch))
}


const getDataForRenderFromLocalStorage = (nameOfData) => {
    let a = JSON.parse(localStorage.getItem(nameOfData))
    return a
} 


const putAmountCardsOnScreen = (number) => {
    let a = localStorage.setItem('cardsOnScreen', JSON.stringify(number))
    return a
} 

const putAmountCardsOnScreenInSavedBlock = (number) => {
    let a = localStorage.setItem('cardsOnScreenInSavedZone', JSON.stringify(number))
    return a
} 

const getAmountCardsOnScreen = () => {
    let a = JSON.parse(localStorage.getItem('cardsOnScreen'))
    return a
} 

const getAmountCardsOnScreenInSavedBlock = (number) => {
    let a = JSON.parse(localStorage.getItem('cardsOnScreenInSavedZone'))
    return a
} 

const getSavedMovies = () => {
    let a = JSON.parse(localStorage.getItem('savedMovies'))
    return a
} 
// console.log('getSavedMovies', getSavedMovies())

const isSaved = (movie) => getSavedMovies().some((item) => item.movieId === movie.id);

// console.log('getSavedMovies()!!!!!!!!!!!!', getSavedMovies())

function renderOfSearch(amountOfCardsInLine, listOfData) {
    console.log('Начали рендеринг')
    
    let render = true

    let arrayBeforeRender = getDataForRenderFromLocalStorage(listOfData)

    let arrayForRender = []
    let amountOfCardsForRender = 0

    //Проверяем есть ли результат поиска
    if (arrayBeforeRender.length==0){
        setNothingToShow(true)    
        setIsShowContinue(false)    
    } else {
        setNothingToShow(false) 
    }

    // Начинаем собирать массив для рендеринг
    if (arrayBeforeRender.length < 4 ){
        console.log('render',1)
        render = true
        amountOfCardsForRender = arrayBeforeRender.length
        setIsShowContinue(false)
    } 
    else if ((amountOfCardsInLine + getAmountCardsOnScreen()) > arrayBeforeRender.length )
    {
        console.log('render',2)
        render = true
        amountOfCardsForRender = arrayBeforeRender.length
        setIsShowContinue(false)
    }
    else if (arrayBeforeRender.length==0)
    {
        console.log('render',3)
        render = false
        setNothingToShow(true)
    }
    else {
        console.log('render',444)
        amountOfCardsForRender = amountOfCardsInLine + getAmountCardsOnScreen()
        console.log('render 444',amountOfCardsForRender, getAmountCardsOnScreen())
        setIsShowContinue(true)   
    }

    if (render) {
        console.log('начали итерации',render, amountOfCardsForRender)
        for (let i = 0; i < amountOfCardsForRender; i++) {
                arrayForRender.push(arrayBeforeRender[i])
        }
        console.log('renderOfSearch дошли до рендеринга',arrayForRender)
        setRenderedMovies(arrayForRender)
        putAmountCardsOnScreen(arrayForRender.length)        
    }
}

//------saved render


function renderOfSearchSaved(amountOfCardsInLine, listOfData) {
    // console.log('renderOfSearchSaved Начали рендеринг', listOfData)
    
    let renderSave = true
    let arrayBeforeRenderInSaveMode = getDataForRenderFromLocalStorage(listOfData)
    let arrayForRenderInSaveMode = []
    let amountOfCardsForRender = 0

    //Проверяем есть ли результат поиска
    if (arrayBeforeRenderInSaveMode.length==0){
        setNothingToShow(true)    
        setIsShowContinue(false)    
    } else {
        setNothingToShow(false) 
    }

    // Начинаем собирать массив для рендеринг
    if (arrayBeforeRenderInSaveMode.length < 4 ){
        // console.log('render',1)
        renderSave = true
        amountOfCardsForRender = arrayBeforeRenderInSaveMode.length
        setIsShowContinue(false)
    } 
    else if ((amountOfCardsInLine + getAmountCardsOnScreenInSavedBlock()) > arrayBeforeRenderInSaveMode.length )
    {
        // console.log('render',2)
        renderSave = true
        amountOfCardsForRender = arrayBeforeRenderInSaveMode.length
        setIsShowContinue(false)
    }
    else if (arrayBeforeRenderInSaveMode.length==0)
    {
        // console.log('render',3)
        renderSave = false
        setNothingToShow(true)
    }
    else {
        // console.log('render',444)
        amountOfCardsForRender = amountOfCardsInLine + getAmountCardsOnScreenInSavedBlock()
        // console.log('render 444',amountOfCardsForRender, getAmountCardsOnScreenInSavedBlock())
        setIsShowContinue(true)   
    }

    // console.log('render 4',amountOfCardsForRender)
    if (renderSave) {
        for (let i = 0; i < amountOfCardsForRender; i++) {
            arrayForRenderInSaveMode.push(arrayBeforeRenderInSaveMode[i])
        }
        setRenderedMoviesInSavedBlock(arrayForRenderInSaveMode)
        putAmountCardsOnScreenInSavedBlock(arrayForRenderInSaveMode.length)
    }
}

//Наблюдаем за написанием в строке поиска
function handleChange(e) {
    const {name, value} = e.target;
    setDataSearch(data => ({
        ...data,
        [name]:value
    }))
}


const handleTrailerLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
}


//filterByDuration

function filterByDuration() {
    let arrFoundedMovies = JSON.parse(localStorage.getItem('searchResultOfMovies'))
    let arrRenderShortMovies = []
    arrFoundedMovies.forEach((element) => {
        if (element.duration < 40) {arrRenderShortMovies.push(element)}
    })
    setRenderedMovies(arrRenderShortMovies)
}

function filterByDurationReturn() {
    let arrFoundedMovies = JSON.parse(localStorage.getItem('searchResultOfMovies'))
    setRenderedMovies(arrFoundedMovies)
}

//Saved


function filterByDurationSaved() {
    let arrFoundedMovies = JSON.parse(localStorage.getItem('savedMovies'))
    let arrRenderShortMovies = []
    arrFoundedMovies.forEach((element) => {
        if (element.duration < 40) {arrRenderShortMovies.push(element)}
    })
    setRenderedMoviesInSavedBlock(arrRenderShortMovies)
}

function filterByDurationReturnSaved() {
    let arrFoundedMovies = JSON.parse(localStorage.getItem('savedMovies'))
    setRenderedMoviesInSavedBlock(arrFoundedMovies)
}


function deleteCardFromSaved(card) {
    mainApi.delSavedMovies(card)
    let arrFoundedMovies = JSON.parse(localStorage.getItem('savedMovies'))
    let arrRenderShortMovies = []
    // console.log(arrFoundedMovies._id, card._id)
    arrFoundedMovies.forEach((element) => {
        console.log(element._id, card._id)
        if (element._id == card._id) {} else {arrRenderShortMovies.push(element)}
    })
    localStorage.setItem('savedMovies', JSON.stringify(arrRenderShortMovies))
    setRenderedMoviesInSavedBlock(arrRenderShortMovies)
}


const getSearchResultOfMovies = () => {
    let a = JSON.parse(localStorage.getItem('searchResultOfMovies'))
    return a
} 


function saveCard(card) {
    mainApi.postSavedMovies(card)
    .then(res => {
        mainApi.getSavedMovies()
        .then(res => {
            let arrayForSavedMoviesOfParticularOwner = []
            res.forEach((element) => {

                if (element.owner == currentUser._id) {

                    arrayForSavedMoviesOfParticularOwner.push(element)
                }
            })
            localStorage.setItem('savedMovies', JSON.stringify(arrayForSavedMoviesOfParticularOwner))
            setRenderedMovies(getSearchResultOfMovies())
        })
        .catch((err) => {console.log(err)});
    })
}

function delCard(card) {
    let arrFoundedMovies2 = JSON.parse(localStorage.getItem('savedMovies'))
    let arrRenderShortMovies2 = []
    let toDelete = []
    arrFoundedMovies2.forEach((element) => {
          console.log(element.movieId, card.id)
        if (element.movieId == card.id && element.duration == card.duration) {
            toDelete = element
        } 
    })
    console.log('toDelete',toDelete)
    deleteCardFromSaved(toDelete)
    setRenderedMoviesInSavedBlock(arrRenderShortMovies2)
    setRenderedMovies(getSearchResultOfMovies())
}


function handleClickOnLikeButton(card) {

    if (!card.isSaved(card)) {
        saveCard(card)   
        } else {
        delCard(card)  
        }
}

//-----------------------------


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                <div className="page">
                    <Header 
                        loggedIn = {loggedIn} 
                    />
                        
                        <Switch>
                            
                                <Route exact path path = "/">
                                    <Main />
                                </Route>
                                <ProtectedRoute path = "/movies"
                                    isSaved = {isSaved}
                                    putAmountCardsOnScreen = {putAmountCardsOnScreen}
                                    renderOfSearch = {renderOfSearch}
                                    handleClickContinue = {handleClickContinue}
                                    nothingToShow = {nothingToShow}
                                    isSavedMovies = {isSavedMovies}
                                    handleTrailerLink = {handleTrailerLink}
                                    handleSaveMovies = {handleSaveMovies}
                                    handleChange = {handleChange}
                                    component = {Movies}
                                    loggedIn = {loggedIn} 
                                    isShowContinue = {isShowContinue}
                                    showPreLoader = {showPreLoader}
                                    handleMoviesRequest = {handleMoviesRequest}
                                    handleSearchButton = {handleSearchButton}
                                    handleSearchByFrase = {handleSearchByFrase}
                                    renderedMovies = {renderedMovies}
                                    filterByDuration = {filterByDuration}
                                    filterByDurationReturn = {filterByDurationReturn}
                                    handleClickOnLikeButton = {handleClickOnLikeButton}
                                    // isInSaved = {isInSaved}
                                    arrayForRenderWithRespectToScreenToList = {arrayForRenderWithRespectToScreenToList}   
                                    >
                                </ProtectedRoute>
                                <ProtectedRoute path = "/saved-movies"
                                    component = {SavedMovies}
                                    setStateForActivityOfSearchingInSaveBlock = {setStateForActivityOfSearchingInSaveBlock}
                                    handleClickContinueInSaveMode = {handleClickContinueInSaveMode}
                                    isShowContinue = {isShowContinue}
                                    handleMoviesRequest = {handleMoviesRequest}
                                    handleSearchSavedMoviesButton = {handleSearchSavedMoviesButton}
                                    handleDelSaveMovies = {handleDelSaveMovies}
                                    handleChange = {handleChange}
                                    loggedIn = {loggedIn} 
                                    renderOfSearch = {renderOfSearch}
                                    renderOfSearchSaved = {renderOfSearchSaved}
                                    putAmountCardsOnScreen = {putAmountCardsOnScreen}
                                    putAmountCardsOnScreenInSavedBlock = {putAmountCardsOnScreenInSavedBlock}
                                    renderedMoviesInSavedBlock = {renderedMoviesInSavedBlock}
                                    renderedMovies = {renderedMovies}
                                    filterByDurationSaved = {filterByDurationSaved}
                                    filterByDurationReturnSaved = {filterByDurationReturnSaved}
                                    deleteCardFromSaved = {deleteCardFromSaved}
                                >
                                </ProtectedRoute>
                                <ProtectedRoute path = "/profile"
                                    component = {Profile}
                                    loggedIn = {loggedIn} 
                                    showPreLoader = {showPreLoader}
                                    handleSignOut = {handleSignOut}
                                    handleRenewUser = {handleRenewUser}
                                    renewUserContextAfterPatching = {renewUserContextAfterPatching}
                                >
                                </ProtectedRoute>
                            

                            <Route path = "/signin">
                                <Login 
                                    onLogin = {handleLogin}
                                    showPreLoader = {showPreLoader}
                                />
                            </Route>
                            <Route path = "/signup">
                                <Register 
                                    onRegister={handleRegister} 
                                    showPreLoader = {showPreLoader}
                                />
                            </Route>
                            

                        </Switch>
                    <Footer />
                </div>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;

