import React from 'react';
import './index.css';
// import like from './like.svg'
import { ReactComponent as Like } from "./like.svg";
import cn from 'classnames'



const Card = ({ name, price, discount, wight, description, pictures, currentUser, onProductLike, likes, _id }) => {
  const discountPrice = Math.round(price - price * discount / 100);
  const isLiked = (likes, userId) => likes?.some(id => id === userId);
  const liked = isLiked(likes, currentUser?._id);

  const handleLikeClick = () => {
    console.log('click', isLiked);
    onProductLike({_id, likes})
}
  
  return (
    <div className='card'>
      <div className="card__sticky card__sticky_type_top-left">
        {!!discount && <span className='card__discount'>-{discount}%</span>} {/* двойное отрицание для проверки на булевый тип, без него отражает 0*/}
      </div>
      <div className="card__sticky card__sticky_type_top-right">
        <button className={cn('card__favorite', {
                  'card__favorite_is-active': liked
              })} onClick={handleLikeClick}>
          <Like className='card__favorite-icon'/>
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