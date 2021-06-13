import React from 'react';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Movies from '../components/Movies/Movies';
import Footer from '../components/Footer/Footer';
import Profile from '../components/Profile/Profile';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import SavedMovies from '../components/SavedMovies/SavedMovies';
import Errors from '../components/Errors/Errors';
import { Route, Switch} from 'react-router-dom';


function App() {

    return (
        <div>
            <div className="page">

                    <Switch>
                        <Route exact path path = "/">
                            <Header />
                            <Main />
                            <Footer />
                        </Route>
                        <Route path = "/movies">
                            <Header />
                            <Movies />
                            <Footer />
                        </Route>
                        <Route path = "/saved-movies">
                            <Header />
                            <SavedMovies />
                            <Footer />
                        </Route>
                        <Route path = "/profile">
                            <Header />
                            <Profile />          
                        </Route>
                        <Route path = "/signin">
                            <Login />
                        </Route>
                        <Route path = "/signup">
                            <Register />
                        </Route>
                        <Route path = "*">
                            <Errors />
                        </Route>
                    </Switch>

            </div>
        </div>
    )
}

export default App;
