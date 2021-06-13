import React from 'react';
import '../Errors/errors/errors.css'

const Errors = () => {
    return (
        <div className="errors">
            <h2 className="errors__number">404</h2>
            <p className="errors__text">Страница не найдена</p>
            <a className="errors__link" href="/">Назад</a>
        </div>
    )

};

export default Errors;