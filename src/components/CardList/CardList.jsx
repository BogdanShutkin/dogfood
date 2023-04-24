import React from 'react';
import './index.css'
import Card from '../Card/Card'

const CardList = ({cards}) => {


    return (
        <div className='cards'>
            {cards.map((el, index) => {
                return (
                    <Card key={index} {...el} />
                )
            }) }
        </div>
    );
};

export default CardList;
