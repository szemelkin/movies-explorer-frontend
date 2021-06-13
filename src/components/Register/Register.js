import React from 'react';
import './register/register.css'
import '../Header/header/header.css'
import reactLogo from '../../images/logo.svg';
import { useEffect, useState, useContext } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [nameDirty, setNameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)

    const [nameError, setNameError] = useState('Имя не может быть пустым')
    const [emailError, setEmailError] = useState('Емейл не может быть пустым')
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')

    const [formValid, setFormValid] = useState(false)

    useEffect( () => {
        if (emailError || passwordError || nameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, nameError])
    
    const nameHandler = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 20) {
            setNameError('Имя должно быть длиннее 3 и короче 20 символов')
            if(!e.target.value) {
                setNameError('Имя не может быть пустым')
            }
        } else {
            setNameError('')
        }
    }
    
    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            setEmailError('Некорректный емейл')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
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

    return (
        <form className="register">            
            <img 
                className="header__logo header__logo_type_register" 
                src={reactLogo} 
                alt="Логотип место"/>
            <h1 
                className="profile__title profile__title_type_register">
                Добро пожаловать!
            </h1>

            <div className="register__input-block">
                <h2 
                    className="register__input-title">
                    Имя
                </h2>                
                <input 
                    onChange = {e => nameHandler(e)} 
                    value={name} 
                    onBlur={e => blurHandler(e)} 
                    name = 'name' 
                    className="register__input"  
                    id = "name" type="text" 
                    placeholder = "Имя" 
                />
                {(nameDirty && nameError) && <span className="register__input-error" id="modal__input-name-error">{nameError}</span>}
            </div>

            <div className="register__input-block">
                <h2 className="register__input-title">E-mail</h2>
                <input onChange = {e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name = 'email' className="register__input" id = "email" type="email" required placeholder = "email"/>
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
                />
                {(passwordDirty && passwordError) && <span className="register__input-error" id="modal__input-password-error">{passwordError}</span>}
            </div>

            <button 
                disabled={!formValid} 
                type='submit' 
                className="register__button register__button_inactive">
                Зарегистрироваться
            </button>

            <p className="register__registration-text">Уже зарегистрированы?<Link to="signin" className="register__registration-link" href="">Войти</Link></p>            
        </form>
    )

};

export default Register;