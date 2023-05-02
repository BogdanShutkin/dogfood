import React, { useContext } from "react";
import s from '../FaqPage/FaqPage.module.css'
import { UserContext } from "../../context/userContext";
import ContentHeader from "../../components/ContentHeader/ContentHeader";

const FaqPage = () => {
    const {user} = useContext(UserContext);
    console.log(user);
   
    return (
        <div className={s.container}>
            <ContentHeader title="Профиль"/>
            <div className={s.question}>
                {user?.name ? <span>Выполнен вход с аккаунта: {user?.name}, </span> : null}
                {user?.email && <span>{user?.email}</span>}
                </div>
        </div>
    )
}

export default FaqPage