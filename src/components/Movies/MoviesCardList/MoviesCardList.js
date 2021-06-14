import React from 'react';
import { useEffect, useState } from 'react';

import './movies-card-list/movies-card-list.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import moviesIcon from '../../../images/saved.svg'


const MoviesCardList = (props) => {

    const textInMoviesCardList = 'Ничего не нашли, попробуйте поискать что-нибудь другое'
    // const [showPreloader, setShowPreloader] = useState(true)
    // console.log(props.renderedMovie)
    // console.log(nothingToShow)

    // const [cardAmountForRender, setCardAmountForRender] = useState(0)
    // const [renderOrNot, setRenderOrNot] = useState(true)

    
    // const cardMovie = (index) => {
    //     return (            
    //             <MoviesCard 
    //                 key = {props.renderedMovies[index].id}    
    //                 {...props.renderedMovies[index]}
    //             iconPic = {moviesIcon}
    //         />)
    // }
    
    // console.log('MoviesCardList props.renderedMovies[2]',props.renderedMovies[2])

    // let arrayForRenderWithRespectToScreen = []
    // useEffect(() => {
        
    //     for (let i=0; i = 3; i++) {
    //         arrayForRenderWithRespectToScreen.push(props.renderedMovies[i])
    //     }
    // },[renderOrNot])

    // function renderWithRespectToScreen() {
    //     arrayForRenderWithRespectToScreen = []
    //     for (let i=0; i = 3; i++) {
    //         arrayForRenderWithRespectToScreen.push(props.renderedMovies[i])
    //     }
    // }


    return (
        <section className="movies-card-list">
        {(props.nothingToShow) && <span className="search-form__text search-form__text_type_answer">{textInMoviesCardList}</span>}

            {
                // cardMovie(2)
                props.renderedMovies.map(item => {
                    return (            
                            <MoviesCard 
                                key = {item.id}    
                                {...item}
                                iconPic = {moviesIcon}

                            />)
                    })      


                // arrayForRenderWithRespectToScreen.map(item => {
                //     return (            
                //             <MoviesCard 
                //                 key = {item.id}    
                //                 {...item}
                //                 iconPic = {moviesIcon}

                //             />)
                //     })   

            }          
            
        </section>
    )

};

export default MoviesCardList;