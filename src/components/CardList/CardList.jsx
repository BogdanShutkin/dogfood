import React from 'react';
import './index.css'
import Card from '../Card/Card'

const CardList = ({cards, currentUser, onProductLike}) => {


    return (
        <div className='cards'>
            {cards.map(el => {
                return (
                    <Card key={el._id} {...el} onProductLike={onProductLike} currentUser={currentUser} />
                )
            }) }
        </div>
    );
};

export default CardList;
