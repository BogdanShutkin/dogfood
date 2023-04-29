import React from "react";
import CardList from "../../components/CardList/CardList";
import Spinner from '../../components/Spiner/Spinner'

const CatalogPage = ({isLoading, cards, handleProductLike, currentUser}) => {
    return (
        <>
        {isLoading ?(
            <Spinner />
        ):(
            <CardList isLoading={isLoading} cards={cards} onProductLike={handleProductLike} currentUser={currentUser}/>
        )}
        </>
    )
}

export default CatalogPage;