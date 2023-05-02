import React from "react";
import s from '../RegistrationForm/registrationForm.module.css'
import { useForm } from "react-hook-form";
import Button from "../../Button/Button";
import cn from 'classnames';
import InputText from "../../InputText/InputText";
import { Link } from "react-router-dom/dist";

const LoginForm = ({linkState}) => {

    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

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
            <h3 className={s.title}>Вход</h3>
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
            <Link
                to="/reset-password"
                className={cn(s.description, s.resetPassword)}
                state={linkState}>Восстановить пароль</Link>

            <Button className={s.btn}>Войти</Button>
            <Button href="/registration" look="secondary" type="button" linkState={linkState}>Зарегистрироваться</Button>
        </form>
    )
}

export default LoginForm