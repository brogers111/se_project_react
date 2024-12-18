import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ handleCardClick, clothingItems, handleAddClick, handleModalOpen, handleLogout, onCardLike }){

    return (
        <div className="profile">
            <section className="profile__sidebar">
                <SideBar handleModalOpen={handleModalOpen} handleLogout={handleLogout}/>
            </section>
            <section className="profile__clothing-items">
                <ClothesSection handleAddClick={handleAddClick} handleCardClick={handleCardClick} clothingItems={clothingItems} onCardLike={onCardLike}/>
            </section>
        </div>
    )
}

export default Profile;