import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spiner/Spinner";
import Product from '../../components/Product/Product';
import { api } from "../../utils/api";
import { isLiked } from "../../utils/products";
import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const ProductPage = () => {
    const [product, setProduct] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { productId } = useParams();

    useEffect(() => {
        setIsLoading(true);
        Promise.all([api.getUserInfo(), api.getProductById(productId)])
            .then(([userData, productData]) => {
                setCurrentUser(userData);
                setProduct(productData);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setIsLoading(false);
            })
    }, []);
    
    const handleProductLike = () => {
        const liked = isLiked(product.likes, currentUser._id);
        api.changeLikeProduct(product._id, liked).then((updateCard) =>{
            setProduct(updateCard);
        })
    }

    return (
        <main className="content container">
            {isLoading ? (
                <Spinner />
            ) : (
                !isError && <Product {...product} currentUser={currentUser} onProductLike={handleProductLike} />
            )}
            {isError ? (
                <NotFoundPage />
            ): null}
        </main>
    );
};

export default ProductPage;