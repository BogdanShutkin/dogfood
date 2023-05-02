import React, { useCallback, useContext } from "react";
import Spinner from "../../components/Spiner/Spinner";
import Product from '../../components/Product/Product';
import { api } from "../../utils/api";
import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { CardContext } from "../../context/cardContext";
import { useApi } from "../../hooks/useApi";

const ProductPage = () => {
    const { productId } = useParams();
    const { handleProductLike: handleLike } = useContext(CardContext);

    // const handleGetProduct = () => api.getProductById(productId); было до useCallback
    const handleGetProduct = useCallback(() => api.getProductById(productId), [productId]); //useCallback следит за вызовом функции, если этого нет, то будет бесконечный ререндер. Запоминает результат вызова функции, если ничего не изменилось, то не вызывает функцию снова 
    const { data: product, setData: setProduct, isLoading, error: isError } = useApi(handleGetProduct);
    
    const handleProductLike = useCallback(() => {
        handleLike(product).then((updateProduct) => {
            setProduct(updateProduct)
        })
    }, [product, setProduct, handleLike])

    return (
        <main className="content container">
            {isLoading ? (
                <Spinner />
            ) : (
                !isError && <Product {...product} onProductLike={handleProductLike} />
            )}
            {isError ? (
                <NotFoundPage />
            ): null}
        </main>
    );
};

export default ProductPage;