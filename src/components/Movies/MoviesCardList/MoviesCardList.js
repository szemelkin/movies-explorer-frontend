import React from 'react';
import './movies-card-list/movies-card-list.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import moviesIcon from '../../../images/saved.svg'
import moviesIconBlack from '../../../images/black_flag.svg'

//  <p className="about-project__timeline_description">Front-end</p>
// <p className="about-project__timeline_description">Back-end</p>

const MoviesCardList = () => {
    return (
        <section className="movies-card-list">
            <MoviesCard 
                iconPic = {moviesIcon}
            />
            <MoviesCard 
                iconPic = {moviesIconBlack}
            />
            <MoviesCard 
                iconPic = {moviesIconBlack}
            />
            <MoviesCard 
                iconPic = {moviesIcon}
            />
            <MoviesCard 
                iconPic = {moviesIcon}
            />
            <MoviesCard 
                iconPic = {moviesIconBlack}
            />
            <MoviesCard 
                iconPic = {moviesIcon}
            />
            <MoviesCard 
                iconPic = {moviesIconBlack}
            />
            <MoviesCard 
                iconPic = {moviesIconBlack}
            />
            <MoviesCard 
                iconPic = {moviesIcon}
            />

        </section>
    )

};

export default MoviesCardList;