import React from 'react';
import './footer.css'

const Footer = () => {
    return (
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
    )
};

export default Footer;