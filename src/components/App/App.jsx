import './index.css';
import Header from "../Header/Header";
import Search from '../Search/Search'
import Footer from '../Footer/Footer';
import { useState, useEffect } from 'react';
import useDebouncedValue  from '../../hooks/useDebounceValue';
import { Logo } from '../Logo/Logo';
import { api } from '../../utils/api';
import { isLiked } from '../../utils/products';
import SearchInfo from "../../components/SearchInfo/SearchInfo";
import { Route, Routes } from 'react-router-dom';
import ProductPage from "../../pages/ProductPage/ProductPage"
import CatalogPage from "../../pages/CatalogPage/CatalogPage"
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import FaqPage from '../../pages/FaqPage/FaqPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import FavouritesPage from '../../pages/FavouritesPage/FavouritesPage';
import RegistrationForm from '../Forms/RegistrationForm/RegistrationForm';
import Modal from '../Modal/Modal';
import LoginForm from '../Forms/LoginForm/LoginForm';
import ResetPasswordForm from '../Forms/ResetPasswordForm/ResetPasswordForm'
import { useLocation } from 'react-router-dom/dist';
import RewiewPage from '../../pages/RewiewPage/RewiewPage';

function App() {
    const [cards, setCards] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const debounceSearchQuery = useDebouncedValue(searchQuery, 300);
    const location = useLocation ();
    const backgroundLocation = location.state?.backgroundLocation;
    const initialPath = location.state?.initialPath;

    const addContact = (contactInfo) => {
        setContacts([...contacts, contactInfo])
    }

    useEffect(() => {
        setIsLoading(true);
        Promise.all([api.getUserInfo(), api.getProductsList()])
            .then(([user, data]) => {
                setCurrentUser(user);
                setCards(data.products);

                const favouritesProducts = data.products.filter(item => isLiked(item.likes, user._id));
                setFavourites(favouritesProducts)
            })
            .catch(err => console.error(err))
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    useEffect(() => {
        handleRequest();
    },[debounceSearchQuery]);

    function handleFormSubmit(e) {
        e.preventDefault();
        handleRequest();
    }


    const handleRequest = () => {
        setIsLoading(true);
        api.getListBySearch(debounceSearchQuery)
        .then(data => {setCards(data)})
        .catch(err => console.error(err))
        .finally(() => {setIsLoading(false)})
    }

    const handleInputChange = (inputValue) => {
        setSearchQuery(inputValue);
    }

    const handleProductLike = (product) => {
        const liked = isLiked(product.likes, currentUser._id);
        return api.changeLikeProduct(product._id, liked).then((newCard) => {
            const newCards = cards.map((card) => {
                return card._id === newCard._id ? newCard : card;
             })

            if (!liked) {
                setFavourites(prevState => [...prevState, newCard])
            } else {
                setFavourites(prevState => prevState.filter(card => card._id !== newCard._id))
            }

            setCards(newCards);
            return newCard;
        })
    }

    return (
        <UserContext.Provider value={{user: currentUser, isLoading}}>
            <CardContext.Provider value={{cards, favourites, handleProductLike}}>
                <Header>
                    <Logo className='logo logo_place_header' href='/' />
                    <Search onInput={handleInputChange} onSubmit={handleFormSubmit} />
                </Header>

                <main className="content container">
                    <SearchInfo searchCount={cards.length} searchText={searchQuery} />

                    <Routes location={ (backgroundLocation && {...backgroundLocation, pathname: initialPath}) || location }>
                        <Route index element={<CatalogPage />} />
                        <Route path='/product/:productId' element={<ProductPage />} />
                        <Route path='/favourites' element={<FavouritesPage />} />
                        <Route path='/registration' element={<RegistrationForm />} />
                        <Route path='/login' element={<LoginForm />} />
                        <Route path='/reset-password' element={<ResetPasswordForm />} />
                        <Route path='/faq' element={<FaqPage />} />
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/rewiew/:productId' element={<RewiewPage />} />
                        <Route path='*' element={<NotFoundPage/>} />
                    </Routes>

                    {backgroundLocation && ( //подменяем роутер на новый, прописываем ему новый путь
                        <Routes>
                            <Route path="/login" element={
                                <Modal >
                                    <LoginForm linkState={{backgroundLocation: location, initialPath}}/>
                                </Modal>
                            } />
                            <Route path="/registration" element={
                                <Modal>
                                    <RegistrationForm linkState={{backgroundLocation: location, initialPath}} />
                                </Modal>
                            } />
                            <Route path="/reset-password" element={
                                <Modal>
                                    <ResetPasswordForm linkState={{backgroundLocation: location, initialPath}}/>
                                </Modal>
                            }/>
                        </Routes>
                    )}
                    </main>
                    
                <Footer />
            </CardContext.Provider>
        </UserContext.Provider>
    )
}

export default App;