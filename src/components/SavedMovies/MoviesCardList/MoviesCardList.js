import React from 'react';
import './movies-card-list/movies-card-list.css'
import MoviesCard from '../MoviesCard/MoviesCard'

const MoviesCardList = () => {
    return (
        <section className="movies-card-list">
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
        </section>
    )

};

export default MoviesCardList;