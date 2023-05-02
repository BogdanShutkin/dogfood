import React, { useContext } from 'react';
import './index.css';
import Card from '../Card/Card';
import { useNavigate } from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound'
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';

const CardList = ({cards}) => {
    const { user: currentUser, isLoading } = useContext(UserContext);
    const { handleProductLike } = useContext(CardContext);
    const navigate = useNavigate(UserContext);

    return (
    <>
        {!cards.length && !isLoading ?(
           <NotFound title="Простите, по вашему запросу товаров не надено." buttonText="Назад" buttonAction={() => navigate(0)} />
        ) : null}

        <div className='cards'>
            {cards.map(el => {
                return (
                    <Card key={el._id} {...el} onProductLike={handleProductLike} currentUser={currentUser} />
                    )
                }) }
        </div>
    </>
    );
};

export default CardList;
