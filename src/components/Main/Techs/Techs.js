import React from 'react';
import './techs/techs.css'

const Techs = () => {
    return (
        <section className="techs" id="tech">
            <h2 className="about-project__main-title">Технологии</h2>
            <div className="techs__title">7 технологий</div>
            <div className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</div>
            <div className="techs__buttons">
                <button className="techs__button" href="">HTML</button>
                <button className="techs__button" href="">CSS</button>
                <button className="techs__button" href="">JS</button>
                <button className="techs__button" href="">React</button>
                <button className="techs__button" href="">Git</button>
                <button className="techs__button" href="">Express.js</button>
                <button className="techs__button" href="">mongoDB</button>
            </div>
        </section>
    )

};

export default Techs;