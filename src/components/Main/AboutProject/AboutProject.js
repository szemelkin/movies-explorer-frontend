import React from 'react';
import './about-project/about-project.css'

//  <p className="about-project__timeline_description">Front-end</p>
// <p className="about-project__timeline_description">Back-end</p>

const AboutProject = () => {
    return (
        <section className="about-project" id="aboutProject">
            <h2 className="about-project__main-title">О проекте</h2>
            <div className="about-project__description">
                <div className="about-project__description_block">
                    <h3 className="about-project__description_title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__description_text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__description_block">
                    <h3 className="about-project__description_title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__description_text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__timeline">
                <div className="about-project__timeline_block-short">
                    <div className="about-project__timeline_period-short">1 неделя</div>
                    <p className="about-project__timeline_description">Front-end</p>                    
                </div>
                <div className="about-project__timeline_block-long">
                    <div className="about-project__timeline_period-long"> 4 недели</div>
                    <p className="about-project__timeline_description">Back-end</p>                   
                </div>
            </div>
        </section>
    )

};

export default AboutProject;