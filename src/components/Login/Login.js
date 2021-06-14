import React from 'react';
import './login/login.css'
import '../Header/header/header.css'
import reactLogo from '../../images/logo.svg';
import Preloader from '../Movies/Preloader/Preloader';

import { useEffect, useState, useContext } from 'react'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { Link, useHistory, useLocation } from 'react-router-dom'

const Login = (props) => {

    const currentUser = React.useContext(CurrentUserContext);

    console.log('Login',currentUser)

    const initialLoginData = {
        name: '',
        email: '',
    }

    const [dataLogin, setDataLogin] = useState(initialLoginData)
    const history = useHistory();

    //Стейты для валидации
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)

    const [emailError, setEmailError] = useState('Емейл не может быть пустым')
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')

    const [message, setMessage] = useState('')

    const [formValid, setFormValid] = useState(false)


    //Проверка наличия емейла и пароля
    useEffect( () => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])
    
   
    function emailHandler(e) {
        setEmail(e.target.value)
        console.log('emailHandler', email)
        handleChange(e)
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный емейл')
        } else {
            setEmailError('')
        }   
        // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        handleChange(e)
        if (e.target.value.length < 3 || e.target.value.length > 20) {
            setPasswordError('Пароль должен быть длиннее 3 и короче 20 символов')
            if(!e.target.value) {
                setPasswordError('Пароль не может быть пустым')
            }
        } else {
            setPasswordError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDataLogin(data => ({
            ...data,
            [name]:value
        }))
    }

    
    const resetForm = () => {
        setPasswordError('')
        setEmailError('')
        setMessage('');
    }
    
    const handleSubmit = (e) => {    
        e.preventDefault();
        console.log('handleSubmit',dataLogin, email)
        if (!dataLogin.email || !dataLogin.password) {
            console.log('прикатились сюда')
            return;
        }
        props.onLogin(dataLogin)
            .then(console.log('dataLogin',dataLogin))
            .then(resetForm)  
            .then(console.log('дошли'))
            .then(() => history.push('/movies'))
            .catch(err => setMessage(err.message || 'Что-то пошло не так!'))
        }

    return (
        <form onSubmit = {handleSubmit} className="register">            
            <img className="header__logo header__logo_type_register" src={reactLogo} alt="Логотип место"/>
            <h1 className="profile__title profile__title_type_register">Рады видеть!</h1>

            <div className="register__input-block">
                <h2 className="register__input-title">E-mail</h2>
                <input 
                    onChange = {e => emailHandler(e)} 
                    value={email} 
                    onBlur={e => blurHandler(e)} 
                    name = 'email' 
                    className="register__input" 
                    id = "email" 
                    type="email" 
                    required placeholder = "email"
                />
                {(emailDirty && emailError) && <span className="register__input-error" id="modal__input-email-error">{emailError}</span>}
            </div>

            <div className="register__input-block">
                <h2 className="register__input-title">Пароль</h2>
                <input 
                    onChange = {e => passwordHandler(e)} 
                    value={password} 
                    onBlur={e => blurHandler(e)} 
                    name = 'password' 
                    className="register__input" 
                    id = "password" 
                    type="password" 
                    required 
                    placeholder = "password"
                    autoComplete="on"
                />
                {(passwordDirty && passwordError) && <span className="register__input-error" id="modal__input-password-error">{passwordError}</span>}
            </div>
            {props.showPreLoader ? <Preloader />: null}
            <button 
                disabled={!formValid} 
                type='submit' 
                className="register__button register__button_inactive">
                Войти
            </button>

            <p className="register__registration-text">Еще не зарегистрированы?<Link to="signup" className="register__registration-link" href="">Регистрация</Link></p>            
        </form>
    )

};

export default Login;