import React, { useContext } from "react";
import CardList from "../../components/CardList/CardList";
import Spinner from '../../components/Spiner/Spinner';
import { UserContext } from "../../context/userContext";

const CatalogPage = () => {
    const {isLoading} = useContext(UserContext);

    return (
        <>
        {isLoading ?(
            <Spinner />
        ):(
            <CardList />
        )}
        </>
    )
}

export default CatalogPage;