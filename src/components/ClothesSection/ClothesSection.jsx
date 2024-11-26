import { useContext } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({handleCardClick, clothingItems, handleAddClick}){
    const { currentUser } = useContext(CurrentUserContext);

    const currentUserClothingItems = clothingItems.filter((item) => item.owner === currentUser._id);

    return (
        <div className="clothes-section">
            <div className="clothes-section__header">
                <p className="clothes-section__header-title">Your items</p>
                <button onClick={handleAddClick} className="clothes-section__header-button">+ Add New</button>
            </div>
            <ul className="clothes-section__items">
                {currentUserClothingItems.map((item) => {
                    return <ItemCard key={item._id} item={item} handleCardClick={handleCardClick}/>
                })}
            </ul>
        </div>
    )
}

export default ClothesSection;