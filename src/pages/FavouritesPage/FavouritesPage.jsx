import React, {useContext} from "react";
import { CardContext } from "../../context/cardContext";
import CardList from "../../components/CardList/CardList";
import ContentHeader from "../../components/ContentHeader/ContentHeader";
const FavouritesPage = () => {
    const {favourites} = useContext(CardContext);

    return (
        <>
            <ContentHeader title='Избранное' />
            <CardList cards={favourites}/>
        </>
    )
}

export default FavouritesPage