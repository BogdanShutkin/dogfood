import './index.css';
// import { Logo } from '../Logo/Logo';
// import { Search } from '../Search/Search';

const Header = ({children}) => {
    return (
        <header>
            <div className="header">
                <div className="container">
                    <div className="header__wrapper">
                        {children}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;