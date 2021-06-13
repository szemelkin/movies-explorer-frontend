import React from 'react';
import '../Movies/movies.css'
import SearchForm from '../Movies/SearchForm/SearchForm'
import MoviesCardList from '../SavedMovies/MoviesCardList/MoviesCardList'
import FilterCheckBox from '../Movies/FilterCheckBox/FilterCheckBox'

const SavedMovies = () => {
    return (
        <div className="movies">
            <SearchForm />
            <FilterCheckBox />
            <MoviesCardList />
        </div>
    )

};

export default SavedMovies;