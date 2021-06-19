import React from 'react';
import { useEffect, useState } from 'react';

import './movies-card-list/movies-card-list.css'
import MoviesCard from '../MoviesCard/MoviesCard'


const MoviesCardList = (props) => {

    const textInMoviesCardList = 'Ничего не нашли, попробуйте поискать что-нибудь другое'
    
    console.log('MoviesCardList', props)



    return (
        <section className="movies-card-list">
        {(props.nothingToShow) && <span className="search-form__text search-form__text_type_answer">{textInMoviesCardList}</span>}

            {
                // props.arrayForRenderWithRespectToScreenToList.map(item => {
                props.renderedMovies.map(item => {
                    return (            
                            <MoviesCard
                                isSavedMovies = {props.isSavedMovies}
                                handleSaveMovies = {props.handleSaveMovies}
                                handleClickOnLikeButton = {props.handleClickOnLikeButton}
                                isSaved = {props.isSaved}
                                key = {item.id}    
                                {...item}
                                
                            />)
                    })   

            }          
            
        </section>
    )

};

export default MoviesCardList;