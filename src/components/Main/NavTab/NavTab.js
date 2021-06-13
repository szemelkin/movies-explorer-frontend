import React from 'react';
import './nav-tab/nav-tab.css'

const NavTab = () => {
    return (
        <section className="nav-tab">
            <div className="nav-tab__title">Учебный проект студента факультета Веб-разработки.</div>
            <div className="nav-tab__buttons">
                <a className="nav-tab__button" href="#aboutProject">О проекте</a>
                <a className="nav-tab__button" href="#tech">Технологии</a>
                <a className="nav-tab__button" href="#aboutMe">Студент</a>
            </div>
        </section>
    )

};

export default NavTab;