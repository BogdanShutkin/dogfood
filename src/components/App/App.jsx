import './index.css';
import Header from "../Header/Header";
import Search from '../Search/Search'
import CardList from "../CardList/CardList";
import Footer from '../Footer/Footer';
import data from '../../data.json'
import { useState, useEffect } from 'react';
import { Logo } from '../Logo/Logo';

function App() {
    const [cards, setCards] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        handleRequest();
    },[searchQuery]);

    function handleFormSubmit(e) {
        e.preventDefault();
        handleRequest();
    }

    const handleRequest = () => {
        const filterCard = data.filter(item => item.name.toUpperCase().includes(searchQuery.toUpperCase()))
        setCards(filterCard);
    }
    
    const handleInputChange = (inputValue) => {
        setSearchQuery(inputValue);
    }

    return (
        <>
            <Header>
                <Logo className='logo logo_place_header' href='/' />
                <Search onInput={handleInputChange} onSubmit={handleFormSubmit} />
            </Header>
            <main className="content container">
                <CardList cards={cards}/>
            </main>
            <Footer />
        </>
    )
}

export default App;