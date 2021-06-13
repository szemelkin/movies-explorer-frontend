import React from 'react';
import './movies.css'
import SearchForm from '../Movies/SearchForm/SearchForm'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'
import FilterCheckBox from '../Movies/FilterCheckBox/FilterCheckBox'
import Continue from '../Movies/Continue/Continue'

const Movies = () => {
    return (
        <div className="movies">
            <SearchForm />
            <FilterCheckBox />
            <MoviesCardList />
            <Continue />
        </div>
    )

};

export default Movies;