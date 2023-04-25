import React from 'react';
import './index.css';
import like from './like.svg'



const Card = ({ name, price, discount, wight, description, pictures }) => {
  const discountPrice = Math.round(price - price * discount / 100);
  
  return (
    <div className='card'>
      <div className="card__sticky card__sticky_type_top-left">
        {!!discount && <span className='card__discount'>-{discount}%</span>} {/* двойное отрицание для проверки на булевый тип, без него отражает 0*/}
      </div>
      <div className="card__sticky card__sticky_type_top-right">
        <button className='card__favorite'>
          <img src={like} alt="Добавить в избранное" className='card__favorite-icon'/>
        </button>
      </div>
      <a href="#" className='card__link'>
          <img src= {pictures} alt={description} className='card__image'/>
        <div className="card__desc">
          {/* <span className='card__price'>{price}</span> */}
          <span className={discount !== 0  ? 'card__old-price' : 'card__price'}>{price}&nbsp;₽</span>
          {!!discount && <span className='card__price card__price_type_discount'>{discountPrice}&nbsp;₽</span>}
          <span className='card__weight'>{wight}</span>
          <p className="card__name">{name}</p>
        </div>
      </a>
      <a href="#" className='card__cart btn btn_type_primary'>В корзину</a>
    </div>);
};

export default Card;