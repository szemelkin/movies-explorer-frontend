import React from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom'
import './footer.css'

const Footer = () => {

    const location = useLocation();

    const common = 
        <div>
            <footer className="footer">
                <p className="footer__description-text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__line"></div>
                <div className="footer__items">
                    <div className="footer__copyright">&copy; 2020</div>
                    <div className="footer__links">
                        <a className="footer__link" href="">Яндекс.Практикум</a>
                        <a className="footer__link" href="">Github</a>
                        <a className="footer__link" href="">Facebook</a>
                    </div>
                </div>
            </footer>
        </div>

    const signing = 
        <div>
        </div>

    const currentUrl = location.pathname

    const menuNavigation = (currentUrl) => {
        if (currentUrl == "/") {return common}
        else if (currentUrl == '/movies') {return common}
        else if (currentUrl == '/saved-movies') {return common}
        else if (currentUrl == '/profile') {return common}
        else if (currentUrl == '/signin') {return signing}
        else if (currentUrl == '/signup') {return signing}
    }

    return (
        <div>
            {
                menuNavigation(currentUrl)                
            }
        </div>
    )
};

export default Footer;