import React, { useCallback, useContext } from "react";
import s from './RewiewPage.module.css'
import cn from "classnames";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
import { useParams } from "react-router-dom/dist";
import { useApi } from "../../hooks/useApi";
import { api } from "../../utils/api";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";

const RewiewPage = () => {
    const { productId } = useParams();
    const handleGetProduct = useCallback(() => api.getProductById(productId), [productId]);
    const { data: product } = useApi(handleGetProduct);
   
    const handleRewiew = (product) => {
        api.makeRewiew(productId)
        .then(console.log("Отзыв отправлен!"))
        .catch(err => console.error(err))
    }

    return (
        <div className={s.container}>
            <ContentHeader title={`Отзыв о товаре ${product?.name}`}/>
            
            <InputText
                placeholder="Поделитесь впечатлениями о товаре" 
                />

            <Button className={cn('btn', 'btn_type_primary', s.rewiewBtn)} onClick={handleRewiew}>Отправить отзыв</Button>
        </div>
    )
}

export default RewiewPage