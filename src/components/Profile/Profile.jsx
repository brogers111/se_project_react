import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({handleCardClick, newClothingItems}){
    return (
        <div className="profile">
            <section className="profile__sidebar">
                <SideBar />
            </section>
            <section className="profile__clothing-items">
                <ClothesSection handleCardClick={handleCardClick} newClothingItems={newClothingItems} />
            </section>
        </div>
    )
}

export default Profile;