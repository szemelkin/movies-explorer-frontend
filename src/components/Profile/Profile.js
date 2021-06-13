import React from 'react';
import './profile/profile.css'
import Header from '../Header/Header'

import { Link, useHistory, useLocation } from 'react-router-dom'


const Profile = () => {
    return (
        <section className="profile">            
            <h1 className="profile__title">Привет, Виталий!</h1>
            <div className="profile__field">
                <p className="profile__text">Имя</p>
                <p className="profile__text">Виталий</p>
            </div>
            <div className="profile__field">
                <p className="profile__text">Почта</p>
                <p className="profile__text">pochta@yandex.ru</p>
            </div>
            <a className="profile__edit" href="">Редактировать</a>
            <Link to="/" className="profile__exit">Выйти из аккаунта</Link>
        </section>
    )

};

export default Profile;