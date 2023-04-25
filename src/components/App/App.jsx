import './index.css';
import Header from "../Header/Header";
import Search from '../Search/Search'
import CardList from "../CardList/CardList";
import Footer from '../Footer/Footer';
import data from '../../data.json'
import { useState, useEffect } from 'react';
import { Logo } from '../Logo/Logo';
import { api } from '../../utils/api';

function App() {
    const [cards, setCards] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    
    const getList = async () => await api.getProductsList();
    const getUser = async () => await api.getUserInfo();

    useEffect(() => {
        getList().then(data => setCards(data.products));
      }, []);

    useEffect(() => {
        getUser().then(user => setCurrentUser(user));
    }, []);

    useEffect(() => {
        handleRequest();
    },[searchQuery]);

    function handleFormSubmit(e) {
        e.preventDefault();
        handleRequest();
    }


    const handleRequest = () => {
        api.getListBySearch(searchQuery).then(data => {
            setCards(data);
        }).catch(err => console.error(err));
    }
    // const handleRequest = () => {
    //     const filterCard = data.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
    //     setCards(filterCard);
    // }

    const handleInputChange = (inputValue) => {
        setSearchQuery(inputValue);
    }

    const handleProductLike = (product) => {
        const isLiked = (likes, userId) => likes?.some(id => id === userId);
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
                <CardList cards={cards} onProductLike={handleProductLike} currentUser={currentUser} />
            </main>
            <Footer />
        </>
    )
}

export default App;