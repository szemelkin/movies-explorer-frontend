import React from 'react';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import './main.css'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Main = () => {

    const currentUser = React.useContext(CurrentUserContext);
    console.log('Main',currentUser)


    return (
        <div>
            <main className="main">
                <NavTab />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main>
        </div>
    )

};

export default Main;