import React from 'react';
import './index.css';
import Card from '../Card/Card';
import { useNavigate } from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound'

const CardList = ({isLoading, cards, currentUser, onProductLike}) => {
    const navigate = useNavigate();

    return (
    <>
        {!cards.length && !isLoading ?(
           <NotFound title="Простите, по вашему запросу товаров не надено." buttonText="Назад" buttonAction={() => navigate(0)} />
        ) : null}

        <div className='cards'>
            {cards.map(el => {
                return (
                    <Card key={el._id} {...el} onProductLike={onProductLike} currentUser={currentUser} />
                    )
                }) }
        </div>
    </>
    );
};

export default CardList;
