import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import reactLogo from '../../images/logo.svg';
import profileLink from '../../images/profile.svg';
import burgerMenu from '../../images/burger_menu_max.svg';
import crossButton from '../../images/close_cross.svg';
import './header/header.css'

const handleBurger = (e) => {
    document.getElementById("surprise").classList.toggle('header__invisible')
    document.getElementById("burgerButton").classList.toggle('header__invisible')
    document.getElementById("crossButton").classList.toggle('header__invisible')
    document.getElementById("surprise1").classList.toggle('header__invisible')
    document.getElementById("surprise2").classList.toggle('header__invisible')
    document.getElementById("surprise3").classList.toggle('header__invisible')
    document.getElementById("surprise4").classList.toggle('header__invisible')
    document.getElementById("surprise5").classList.toggle('header__invisible')
    document.getElementById("surprise6").classList.toggle('header__invisible')

}

const handleCrossButton = (e) => {
    document.getElementById("surprise").classList.toggle('header__invisible')
    document.getElementById("burgerButton").classList.toggle('header__invisible')
    document.getElementById("crossButton").classList.toggle('header__invisible')
    document.getElementById("surprise1").classList.toggle('header__invisible')
    document.getElementById("surprise2").classList.toggle('header__invisible')
    document.getElementById("surprise3").classList.toggle('header__invisible')
    document.getElementById("surprise4").classList.toggle('header__invisible')
    document.getElementById("surprise5").classList.toggle('header__invisible')
    document.getElementById("surprise6").classList.toggle('header__invisible')

}


const Header = () => {

    const location = useLocation();

    const signin = 
        <div>
            <header className="header">
                <img className="header__logo" src={reactLogo} alt="Логотип место"/>
                <div className="header__menu">
                    <Link to="signup" className="header__link" href="/signup">Регистрация</Link>
                    <Link to="signin" className="header__button" href="/signin">Войти</Link>
                </div>
            </header>
        </div>
        
    const logined = 
        <div>
            <header className="header">
                <img className="header__logo" src={reactLogo} alt="Логотип место"/>
                <div className="header__menu">
                    <Link to="movies" className="header__link header__link_type_hidden" href="/movies">Фильмы</Link>
                    <Link to="saved-movies" className="header__link header__link_type_hidden" href="/saved-movies">Сохраненные фильмы</Link>
                    <Link to="profile" className="header__link header__link_type_hidden" href="/profile"><img className="header__profileLink" src={profileLink} alt="Логотип место"/></Link>
                    <button id='burgerButton' onClick = {(e) => handleBurger()} className="header__burger-button"><img className="header__burger" src={burgerMenu}/></button>  
                    <button id='crossButton' onClick = {(e) => handleCrossButton()} className="header__burger-button header__burger-button_type_black header__invisible"><img className="header__burger" src={crossButton}/></button>                  
                    <div id='surprise' className="header__burger-menu header__invisible">
                        <div id='surprise1' className="header__burger-menu-links-left header__invisible"></div>  
                        <div id='surprise2' className="header__burger-menu-links header__invisible">           
                            <Link to="movies" id='surprise3' className="header__link_type_burger header__invisible" href="/">Главная</Link>          
                            <Link to="movies" id='surprise4' className="header__link_type_burger header__invisible" href="/movies">Фильмы</Link>
                            <Link to="saved-movies" id='surprise5' className="header__link_type_burger header__invisible" href="/saved-movies">Сохраненные фильмы</Link>
                            <Link to="profile" id='surprise6' className="header__link_type_burger header__invisible" href="/profile"><img className="header__profileLink" src={profileLink} alt="Логотип место"/></Link>
                        </div>  
                    </div>
                </div>
            </header>
        </div>

    const currentUrl = location.pathname

    const menuNavigation = (currentUrl) => {
        if (currentUrl == "/") {return signin}
        else if (currentUrl == '/movies') {return logined}
        else if (currentUrl == '/saved-movies') {return logined}
        else if (currentUrl == '/profile') {return logined}
    }

    return (
        <div>
            {
                menuNavigation(currentUrl)                
            }
        </div>
    )

};

export default Header;