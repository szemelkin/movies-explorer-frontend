import React from 'react';
import './about-me/about-me.css'
import aboutMePhoto from '../../../images/pic__COLOR_pic.svg'

const AboutMe = () => {
    return (
        <section className="about-me" id="aboutMe">
            <h2 className="about-project__main-title">Студент</h2>
            <div className="about-me__main">
                <div className="description">
                    <p className="about-me__title">Виталий</p>
                    <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
                    <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <div className="about-me__links">
                        <a className="about-me__text_links" href="">Facebook</a>
                        <a className="about-me__text_links" href="">Github</a>
                    </div>
                </div> 
                <img className="about-me__photo" src={aboutMePhoto} alt="Логотип место"/>
            </div>
        </section>
    )

};

export default AboutMe;