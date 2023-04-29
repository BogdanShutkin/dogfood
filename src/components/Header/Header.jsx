// import './index.css';
import s from './Header.module.css'
import cn from 'classnames';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';

const Header = ({children}) => {
    const {user} = useContext(UserContext)

    return (
        <header className={cn(s.header, 'js-click')}>
            <div className="container">
                    {user?.name ? <span>Выполнен вход с аккаунта: {user?.name}, </span> : null}
                    {user?.email && <span>{user?.email}</span>}
                
                <div className={s.wrapper}>
                    {children}
                </div>
            </div>
        </header>
    )
}

export default Header;