// import './index.css';
import s from './Header.module.css'
import cn from 'classnames';

const Header = ({user, children}) => {
    return (
        <header className={cn(s.header, 'js-click')}>
            <div className="container">
                <p>Выполнен вход с аккаунта:
                    {user?.name ? <span> {user?.name}, </span> : null}
                    {user?.email && <span>{user?.email}</span>}
                </p>
                
                <div className={s.wrapper}>
                    {children}
                </div>
            </div>
        </header>
    )
}

export default Header;