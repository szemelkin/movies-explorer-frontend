import React from 'react';
import './portfolio/portfolio.css'
import linkArrow from '../../../images/link__arrow.svg'

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h2 className="portfolio__main-title">Портфолио</h2>
            <div className="portfolio__links">
                <div className="portfolio__link-block">
                    <div className="portfolio__link-name">Статичный сайт</div>
                    <a className="portfolio__link"><img className="portfolio__link-pic" src={linkArrow} alt="Логотип место"/></a>
                </div>
                <div className="portfolio__link-block">
                    <div className="portfolio__link-name">Адаптивный сайт</div>
                    <a className="portfolio__link"><img className="portfolio__link-pic" src={linkArrow} alt="Логотип место"/></a>
                </div>
                <div className="portfolio__link-block">
                    <div className="portfolio__link-name">Одностраничное приложение</div>
                    <a className="portfolio__link"><img className="portfolio__link-pic" src={linkArrow} alt="Логотип место"/></a>
                </div>
            </div>
        </section>
    )

};

export default Portfolio;