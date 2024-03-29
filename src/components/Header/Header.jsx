// import './index.css';
import s from './Header.module.css'
import cn from 'classnames';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom/dist';
import { ReactComponent as FavouriteIcon} from './img/Favourites.svg';
import { ReactComponent as ProfileIcon} from './img/profile.svg';
import { ReactComponent as UserIcon} from './img/User.svg';
import { CardContext } from '../../context/cardContext';

const Header = ({children}) => {
    const {favourites} = useContext(CardContext);
    const location = useLocation();

    return (
        <header className={cn(s.header, 'cover')}>
            <div className="container">
                <div className={s.wrapper}>
                    {children}
                    <div className={s.iconsMenu}>
                        <Link className={s.favouritesLink} to={{pathname: '/favourites'}}>
                            <FavouriteIcon />
                            {favourites.length !== 0 && <span className={s.iconBubble}>{favourites.length}</span>}
                        </Link>

                        <div className={s.userIcon}>
                            <Link to="login" state={{
                                backgroundLocation: location, 
                                initialPath: location.pathname
                            }}><ProfileIcon /></Link>
                        </div>

                        <Link className={s.favouritesLink} to={{pathname: '/profile'}}>
                            <UserIcon />
                        </Link>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;