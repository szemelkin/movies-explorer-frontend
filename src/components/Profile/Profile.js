import React from 'react';

import { useEffect, useState, useContext } from 'react'
import './profile/profile.css'
import Header from '../Header/Header'

import { Link, useHistory, useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = (props) => {

    const currentUser = React.useContext(CurrentUserContext);



    const [isEdited, setIsEdited] = useState(false)

    function handleEditButton() {
        if (!isEdited) {
        setIsEdited(true)}
        else {setIsEdited(false)}
    }

    useEffect(() =>{
        setIsEdited(false)
        setNameDirty(false)
        setEmailDirty(false)
    },[])


    useEffect(() =>{
        currentUser.name
        currentUser.email
    },[currentUser])

    //-------

    const initialData = {
        name: '',
        email: '',
        };
    const [data, setData] = useState(initialData);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    const [nameDirty, setNameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
  

    const [nameError, setNameError] = useState('Имя не может быть пустым')
    const [emailError, setEmailError] = useState('Емейл не может быть пустым')

    const [formValid, setFormValid] = useState(false)


    

    useEffect( () => {
        if (emailError || nameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, nameError])
    
    const nameHandler = (e) => {
        setName(e.target.value)
        handleChange(e)
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
        handleChange(e)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный емейл')
        } else {
            setEmailError('')
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
        }
    }


    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
            const { name, value } = e.target;
            setData(data => ({
            ...data,
            [name]:value
            })
        );
    }

    const resetForm = () => {
        setPasswordError('')
        setEmailError('')
        setMessage('');
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.email || !data.name) {
        return;
        }
        console.log('Profile handleSubmit',data)
        props.handleRenewUser(data)
        .then(resetForm)
        // .then(props.renewUserContextAfterPatching())
        .catch(err => setMessage(err.message || 'Что-то пошло не так!'))
        

    }

    //-------


    const notEdited = 
        <form onSubmit = {handleSubmit}>
            <div className="profile__field">
                <p className="profile__text">Имя</p>
                <input 
                    onChange = {e => nameHandler(e)} 
                    value={name} 
                    onBlur={e => blurHandler(e)} 
                    name = 'name' 
                    className="register__input register__input_type_profile "  
                    id = "name" type="text" 
                    placeholder = "Имя" 
                />
                {(nameDirty && nameError) && <span className="register__input-error" id="modal__input-name-error">{nameError}</span>}
            </div>
            <div className="profile__field">
                <p className="profile__text">Почта</p>
                <input 
                    onChange = {e => emailHandler(e)} 
                    value={email} 
                    onBlur={e => blurHandler(e)} 
                    name = 'email' 
                    className="register__input register__input_type_profile " 
                    id = "email" 
                    type="email" 
                    required placeholder = "email"/>
                {(emailDirty && emailError) && <span className="register__input-error" id="modal__input-email-error">{emailError}</span>}
            </div>
            <button 
                disabled={!formValid} 
                type='submit' 
                className="register__button register__button_inactive">
                Обновить
            </button>
        </form>

    const edited = 
        <div>
            <div className="profile__field">
                <p className="profile__text">Имя</p>
                <p className="profile__text">{currentUser.name}</p>
            </div>
            <div className="profile__field">
                <p className="profile__text">Почта</p>
                <p className="profile__text">{currentUser.email}</p>
            </div>

        </div>


    const profileVisual = (isEdited) => {
        if (!isEdited) {
            return edited}
        else {
            return notEdited}        
    }

    return (
        <section className="profile">            
            <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                {profileVisual(isEdited)}
                
            <button onClick = {handleEditButton} className="profile__edit" href=""> Редактировать </button>
            <Link onClick = {props.handleSignOut} to="/" className="profile__exit">Выйти из аккаунта</Link>
        </section>
    )

};

export default Profile;