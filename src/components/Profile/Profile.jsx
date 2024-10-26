import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ handleCardClick, clothingItems, avatar, username }){
    return (
        <div className="profile">
            <section className="profile__sidebar">
                <SideBar  avatar={avatar} username={username}/>
            </section>
            <section className="profile__clothing-items">
                <ClothesSection handleCardClick={handleCardClick} clothingItems={clothingItems} />
            </section>
        </div>
    )
}

export default Profile;