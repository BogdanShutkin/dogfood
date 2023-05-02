import React, { useEffect, useState } from "react";
import s from './Modal.module.css';
import cn from 'classnames';
import { useLocation, useNavigate } from "react-router-dom/dist";
import {ReactComponent as Close} from '../Forms/RegistrationForm/img/ic-close.svg';

const Modal = ({children}) => {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const initialPath = location.state?.initialPath;

    useEffect(() => {
        setActive(true);
    }, [])

    const handleClose = () => {
        setActive(false);
        navigate(initialPath ? initialPath : -1);
    }

    return (
        <div className={cn(s.modal, {
            [s.active]: active
            })} onClick={handleClose}>
                <div className={cn(s.modalContent, {
                    [s.active]: active
                    })} onClick={e => e.stopPropagation()}>
                    <Close className={cn(s.close, {
                        [s.active]: active
                        })} onClick={handleClose}></Close>
                    {children}
                </div>
        </div>
    )
}

export default Modal;