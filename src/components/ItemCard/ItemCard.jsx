import { useContext } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./ItemCard.css"

function ItemCard({ item, handleCardClick, onCardLike }){
    const { currentUser } = useContext(CurrentUserContext);

    const isLiked = item.likes.some(id => id === currentUser._id);
    const itemLikeButtonClassName = `${isLiked ? "card__like-button_liked" : "card__like-button_disliked"}`;

    const handleLike = () => {
        onCardLike(item);
    }

    const onCardClick = () => {
        handleCardClick(item);
    }

    return(
        <li className="card">
            <div className="card__header">
                <h2 className="card__name">{item.name}</h2>
                <button onClick={handleLike} className={itemLikeButtonClassName}></button>
            </div>
            <img onClick={onCardClick} className="card__image" src={item.imageUrl} alt={item.name} />
        </li>
    );
}

export default ItemCard;