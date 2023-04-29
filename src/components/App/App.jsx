import './index.css';
import Header from "../Header/Header";
import Search from '../Search/Search'
import Footer from '../Footer/Footer';
import { useState, useEffect } from 'react';
import useDebouncedValue  from '../../hooks/useDebounceValue';
import { Logo } from '../Logo/Logo';
import { api } from '../../utils/api';
import { isLiked } from '../../utils/products';
import Spinner from '../Spiner/Spinner';
import SearchInfo from "../../components/SearchInfo/SearchInfo";
import { Route, Routes } from 'react-router-dom';
import ProductPage from "../../pages/ProductPage/ProductPage"
import CatalogPage from "../../pages/CatalogPage/CatalogPage"
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

function App() {
    const [cards, setCards] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const debounceSearchQuery = useDebouncedValue(searchQuery, 300);
    
    // const getList = async () => await api.getProductsList();
    // const getUser = async () => await api.getUserInfo();

    // useEffect(() => {
    //     getList().then(data => setCards(data.products));
    //   }, []);

    // useEffect(() => {
    //     getUser().then(user => setCurrentUser(user));
    // }, []);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([api.getUserInfo(), api.getProductsList()])
            .then(([user, data]) => {
                setCurrentUser(user);
                setCards(data.products);
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
    // const handleRequest = () => {
    //     const filterCard = data.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
    //     setCards(filterCard);
    // }

    const handleInputChange = (inputValue) => {
        setSearchQuery(inputValue);
    }

    const handleProductLike = (product) => {
        const liked = isLiked(product.likes, currentUser._id);
        api.changeLikeProduct(product._id, liked).then((newCard) => {
            const newCards = cards.map((card) => {
                // console.log('Карточка в переборе', card);
                // console.log('Карточка с сервера', newCard);
                return card._id === newCard._id ? newCard : card;
             })
            setCards(newCards);
        })
    }

    return (
        <>
            <Header user={currentUser}>
                <Logo className='logo logo_place_header' href='/' />
                <Search onInput={handleInputChange} onSubmit={handleFormSubmit} />
            </Header>

            <main className="content container">
                <SearchInfo searchCount={cards.length} searchText={searchQuery} />

                <Routes>
                    <Route index element={<CatalogPage isLoading={isLoading} handleProductLike={handleProductLike} currentUser={currentUser} cards={cards}/>} />
                    <Route path='/product/:productId' element={<ProductPage />} />
                    <Route path='*' element={<NotFoundPage/>} />
                </Routes>
                </main>
                
            <Footer />
        </>
    )
}

export default App;