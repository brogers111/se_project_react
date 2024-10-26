import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({handleCardClick, newClothingItems}){
    return (
        <div className="clothes-section">
            <div className="clothes-section__header">
                <p className="clothes-section__header-title">Your items</p>
                <button className="clothes-section__header-button">+ Add New</button>
            </div>
            <ul className="clothes-section__items">
                {newClothingItems.map((item) => {
                    return <ItemCard key={item._id} item={item} handleCardClick={handleCardClick }/>
                })}
            </ul>
        </div>
    )
}

export default ClothesSection;