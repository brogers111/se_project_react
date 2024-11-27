import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css"

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
    const {currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext);
    const temp = weatherData.temp[currentTemperatureUnit] || 999;
    
    return(
        <main>
            <WeatherCard weatherData={weatherData} temp={temp} currentTemperatureUnit={currentTemperatureUnit}/>
            <section className="cards">
                <p className="cards__text">
                    Today is {temp}&deg;{currentTemperatureUnit} / You may want to wear:
                </p>
                <ul className="cards__list">
                    {clothingItems
                    .filter((item) => {
                        return item.weather === weatherData.type;
                    })
                    .map((item) => {
                        return <ItemCard key={item._id} item={item} handleCardClick={handleCardClick} onCardLike={onCardLike}/>
                    })}
                </ul>
            </section>
        </main>
    )
}

export default Main;