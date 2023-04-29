import React from 'react';
import './index.css';
import { calcDiscountPrice, isLiked } from '../../utils/products';
import { ReactComponent as Like } from "./like.svg";
import cn from 'classnames'
import { Link } from 'react-router-dom';



const Card = ({ name, price, discount, wight, description, pictures, currentUser, onProductLike, likes, _id, tags }) => {
  const discountPrice = calcDiscountPrice(price, discount);
  const liked = isLiked(likes, currentUser?._id);

  const handleLikeClick = () => {
    onProductLike({_id, likes})
}
  
  return (
    <div className='card'>
      <div className="card__sticky card__sticky_type_top-left">
        {!!discount && <span className='card__discount'>-{discount}%</span>} {/* двойное отрицание для проверки на булевый тип, без него отражает 0*/}
        {tags && tags.map(tag => <span key={tag} className={cn('tag', {
          ['tag_type_new']: tag ==='new',
          ['tag_type_sale']: tag === 'sale',
        })}>{tag}</span>)}
      </div>
      <div className="card__sticky card__sticky_type_top-right">
        <button className={cn('card__favorite', {
                  'card__favorite_is-active': liked
              })} onClick={handleLikeClick}>
          <Like className='card__favorite-icon'/>
        </button>
      </div>
      <Link to={`/product/${_id}`} className='card__link'>
          <img src= {pictures} alt={description} className='card__image'/>
        <div className="card__desc">
          {/* <span className='card__price'>{price}</span> */}
          <span className={discount !== 0  ? 'card__old-price' : 'card__price'}>{price}&nbsp;₽</span>
          {!!discount && <span className='card__price card__price_type_discount'>{discountPrice}&nbsp;₽</span>}
          <span className='card__weight'>{wight}</span>
          <p className="card__name">{name}</p>
        </div>
      </Link>
      <a href="#" className='card__cart btn btn_type_primary'>В корзину</a>
    </div>);
};

export default Card;