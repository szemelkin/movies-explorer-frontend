import React from 'react';
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
import Errors from '../components/Errors/Errors';
import ProtectedRoute from './ProtectedRoute';

import mainApi from '../utils/MainApi'

import * as auth from '../utils/auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();

    const [currentUser, setCurrentUser] = React.useState({
        name: '', 
        email: ''
        })
                

    const initialData = {
        name: '',
        email: '',
        };    

    const testData = {
        name: 'Popa',
        email: 'popa@popa.ru',
        };    

    const handleRequest = () => {
        let  token  = localStorage.getItem('token')
        mainApi.getUserInfo(token)
            .then(res => {
                console.log('handleRequest',res)
                setCurrentUser(res)
                
            })
            .catch((err) => {console.log(err)});  
    
        }
        
    useEffect(() => {
        handleRequest()
        setCurrentUser(testData)
        console.log('useEffect handleRequest',currentUser)
    }, []);

    function handleSignOut() {
        // Удаляем токен из локального хранилища при логауте
        localStorage.removeItem('token');
        localStorage.removeItem('movies');
        // Возвращаем пользовательские данные к начальному состоянию
        setCurrentUser(initialData);
        setLoggedIn(false);
        // Перенаправляем пользователя на страницу логина
        history.push('/');
    }


    const handleRegister = ({name, email, password}) => {
        return auth.register(name, email, password)
        .then(res => {
            if (!res || res.statusCode === 400) {
                new Error('Что-то пошло не так!');            
            }
            if (res) {
                // localStorage.setItem('token')
            return res;
            }
        })
        .catch((err)=>{
            console.log(`Ошибка при загрузке данных пользователя: ${err}`)
        })
    
    }

    const handleRenewUser = (data) => {
        return mainApi.renewUserInfo(data)
        .then(res => {
            if (!res || res.statusCode === 400) {
                new Error('Что-то пошло не так!');            
            }
            if (res) {
                setCurrentUser(data)
            return res;
            
            }
        })
        .catch((err)=>{
            console.log(`Ошибка при загрузке данных пользователя: ${err}`)
        })
    
    }

    // const tokenCheck = () => {
    //     const token = localStorage.getItem('token');      
    //     if (token) {
    //         setLoggedIn(true);    
    //         handleRequest();
    //         history.push('/movies');
    // //         auth.getContent(token).then((res) => {
    // //             if (res) {
    // //             setLoggedIn(true);
    // //             setCurrentUser({
    // //                 name: res.name,`
    // //                 email: res.email,
    // //             })
    // //             console.log(currentUser)
    // //             history.push('/movies');
    //             }
    // //         })
    //         // .catch(() => history.push('/'))
    //         }
    //     }

    const handleLogin = ({ email, password }) => {
    
        return auth.authorize(email, password)
        .then(res => {
            if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
                if (res.token) {        
                    setLoggedIn(true);                
                    localStorage.setItem('token', res.token);
                    console.log('Даже на handleLogin зашли вот с таким токеном', res.token)
                    //--
                    mainApi.getUserInfo(res.token)
                        .then(res => {
                        console.log('handleRequest',res)
                        setCurrentUser(res)
                    
                    })
                    .catch((err) => {console.log(err)});  
        
            }
                //--
                // handleRequest
            })
            
            .then(() => history.push('/movies'))
        }    


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>
                <div className="page">
                    <Header handleRequest = {handleRequest}/>
                        <Switch>
                            
                                <Route exact path path = "/">
                                    <Main />
                                </Route>
                                <ProtectedRoute path = "/movies"
                                    component = {Movies}
                                    loggedIn = {loggedIn} 
                                >
                                </ProtectedRoute>
                                <ProtectedRoute path = "/saved-movies"
                                    component = {SavedMovies}
                                    loggedIn = {loggedIn} 
                                >
                                </ProtectedRoute>
                                <ProtectedRoute path = "/profile"
                                    component = {Profile}
                                    loggedIn = {loggedIn} 
                                    handleRequest = {handleRequest}
                                    handleSignOut = {handleSignOut}
                                    handleRenewUser = {handleRenewUser}
                                >
                                </ProtectedRoute>
                            

                            <Route path = "/signin">
                                <Login 
                                    onLogin = {handleLogin}
                                    // tokenCheck = {tokenCheck}
                                />
                            </Route>
                            <Route path = "/signup">
                                <Register 
                                    onRegister={handleRegister} 
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

