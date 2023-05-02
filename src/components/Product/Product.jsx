import React, { useContext } from "react";
import s from "./Product.module.css";
import { calcDiscountPrice, createMarkup, isLiked } from "../../utils/products";
import cn from "classnames";
import truck from "./img/truck.svg";
import quality from "./img/quality.svg"; 
import comments from "./img/comments.svg"; 
import { ReactComponent as Save } from "./img/save.svg";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ContentHeader from "../ContentHeader/ContentHeader";
import { Link } from "react-router-dom/dist";

const Product = ({_id, onProductLike, description, discount, price, name, pictures, likes}) => {
    const { user: currentUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    const discountPrice = calcDiscountPrice(price, discount);
    const liked = isLiked(likes, currentUser?._id);
    const descriptionHtml = createMarkup(description);
    const [num, setNum] = useState(0);

    return (
        <>
            {/* <div>
                
                <a href="#" className={s.buttonBack} onClick={() => navigate(-1)}><img src={left} alt="назад" />Назад</a>
                <h1 className={s.productTitle}>{name}</h1>
                <div>
                    <span>Артикул: <b>{_id}</b></span>
                </div>
            </div> */}

            <ContentHeader title={name}>
                <span>Артикул: <b>{_id}</b></span>
            </ContentHeader>

            <div className={s.product}>

                <div className={s.imgWrapper}>
                    <img src={pictures} alt={`Изображение - ${name}`} />
                </div>

                <div className={s.desc}>

                    <span className={!!discount ? s.oldPrice : s.price}>{price}&nbsp;₽</span>
                    {!!discount && <span className={cn(s.price, 'card__price_type_discount')}>{discountPrice}&nbsp;₽</span>}

                    <div className={s.btnWrap}>
                        <div className={s.left}>
                            <button className={s.minus} onClick={() => setNum(prevCount => prevCount>0 ? prevCount - 1 : prevCount=0)}>-</button>
                            <button className={s.num}>{num}</button>
                            <button className={s.plus} onClick={() => setNum(prevCount => prevCount + 1)}>+</button>
                        </div>
                        <a href="#" className={cn('btn', 'btn_type_primary', s.cart)}>В корзину</a>
                    </div>

                    <button className={cn(s.favorite, {
                        [s.favoriteActive]: liked
                    })} onClick={onProductLike}>
                        <Save />
                        <span>{liked ? 'В избранном': 'В избранное'}</span>
                    </button>

                    <div className={s.delivery}>
                      <img src={truck} alt="truck" />
                      <div className={s.right}>
                          <h3 className={s.name}>Доставка по всему Миру!</h3>
                          <p className={s.text}>
                            Доставка курьером — <span className={s.bold}> от 399 ₽</span>
                          </p>
                          <p className={s.text}>
                            Доставка в пункт выдачи — <span className={s.bold}> от 199 ₽</span>
                          </p>
                      </div>
                  </div>

                  <div className={s.delivery}>
                      <img src={quality} alt="quality" />
                      <div className={s.right}>
                          <h3 className={s.name}>Гарантия качества</h3>
                          <p className={s.text}>
                              Если Вам не понравилось качество нашей продукции,
                              мы вернем деньги, либо сделаем все возможное,
                              чтобы удовлетворить ваши нужды.
                          </p>
                      </div>
                  </div>
                </div>
            </div>

            <div className={s.box}>
              <h2 className={s.title}>Описание</h2>
              <p className={s.subtitle} dangerouslySetInnerHTML={descriptionHtml} />
              <h2 className={s.title}>Характеристики</h2>
              <div className={s.grid}>
                  <div className={s.naming}>Вес</div>
                  <div className={s.description}>1 шт 120-200 грамм</div>
                  <div className={s.naming}>Цена</div>
                  <div className={s.description}>490 ₽ за 100 грамм</div>
                  <div className={s.naming}>Польза</div>
                  <div className={s.description}>
                      <p>Большое содержание аминокислот и микроэлементов оказывает положительное воздействие на общий обмен веществ собаки.</p>
                      <p>Способствуют укреплению десен и жевательных мышц.</p>
                      <p>Развивают зубочелюстной аппарат, отвлекают собаку во время смены зубов.</p>
                      <p>Имеет цельную волокнистую структуру, при разжевывание получается эффект зубной щетки, лучше всего очищает клыки собак.</p>
                      <p>Следует учесть высокую калорийность продукта.</p>
                  </div>
              </div>
          </div>
          <div className={s.rewiews}>
            <img src={comments} alt="comments" />
            <p>Еще никто не оставил отзыв. Станьте первым!</p>
            <Link to={`/rewiew/${_id}`} className={cn('btn', 'btn_type_primary', s.rewiewBtn)}>Написать отзыв</Link>
          </div>
        </>
    )
};

export default Product;