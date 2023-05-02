import React, { useState } from "react";
import s from './registrationForm.module.css'
import { useForm } from "react-hook-form";
import Button from "../../Button/Button";
import cn from 'classnames';
import InputText from "../../InputText/InputText";
import {ReactComponent as Close} from './img/ic-close.svg'
import { useLocation, useNavigate } from "react-router-dom/dist";

const RegistrationForm = ({linkState}) => {

    // const [active, setActive] = useState(true);
    // const navigate = useNavigate();
    // const location = useLocation();
    // const initialPath = location.state?.initialPath;

    const { register, handleSubmit, formState: {errors} } = useForm({mode: 'onBlur'});

    const onSubmit = (data) => {
        console.log(data);
    }

    // const handleClose = () => {
    //     setActive(false);
    //     navigate(initialPath ? initialPath : -1);
    // }

    const emailRegister = register('email', {
        required: 'Обязательное поле',
        pattern: {
            value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
            message: 'Не валидный email'
        }
    });

    const passwordRegister = register('password', {
        required: 'Обязательное поле',
        pattern: {
            value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
            message: 'Не валидный пароль'
        }
    });

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={s.title}>Регистрация</h3>
            <InputText 
                {...emailRegister}
                placeholder="Email" 
                errorText={errors.email?.message}
            />
            <InputText 
                {...passwordRegister}
                placeholder="Пароль"
                errorText={errors.password?.message}
                />

            <p className={s.description}>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой
                конфиденциальности и соглашаетесь
                на информационную рассылку.</p>

            <Button className={s.btn}>Зарегистрироваться</Button>
            <Button href="/login" look="secondary" type="button" linkState={linkState}>Войти</Button>
        </form>
    )
}

export default RegistrationForm