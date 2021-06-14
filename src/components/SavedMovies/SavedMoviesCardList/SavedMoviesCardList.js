import React from 'react';
import './movies-card-list/movies-card-list.css'
import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard'
import moviesIcon from '../../../images/saved.svg'
import moviesIconBlack from '../../../images/black_flag.svg'

const SavedMoviesCardList = (props) => {

    const textInSavedMoviesCardList = 'Ничего не нашли, попробуйте поискать что-нибудь другое'

    return (
        <section className="movies-card-list">
        {(props.nothingToShow) && <span className="search-form__text search-form__text_type_answer">{textInMoviesCardList}</span>}
            {                
                props.renderedSavedMovies.map(item => {
                    return (<SavedMoviesCard 
                                key = {item._id}    
                                {...item}
                                iconPic = {moviesIcon}
                                isSmthDeleted = {props.isSmthDeleted}
                                handleRerenderAfterDel = {props.handleRerenderAfterDel}
                            />)
                    })      
            }                      
        </section>
    )

};

export default SavedMoviesCardList;