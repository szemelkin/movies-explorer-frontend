import React from 'react';
import './movies-card/movies-card.css'
import moviesPicture from '../../../images/pic_1.svg'
import moviesIcon from '../../../images/delete_from_saved.svg'

//  <p className="about-project__timeline_description">Front-end</p>
// <p className="about-project__timeline_description">Back-end</p>

const MoviesCard = () => {
    return (
        <div>
            <div className="movies-card">
                <div className="movies-card__items">
                    <div className="movies-card__description">
                        <h2 className="movies-card__title">33 слова о дизайне</h2>
                        <p className="movies-card__duration">1ч 47м</p>
                    </div>
                    <button className="movies-card__button"><img className="movies-card__icon" src={moviesIcon} alt="Здесь должна быть картинка"/></button>
                </div>
                <img className="movies-card__image" src={moviesPicture} alt="Здесь должна быть картинка"/>
            </div>
        </div>
    )
};

export default MoviesCard;