import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {

    const weatherOption = weatherOptions.find((option) => option.condition === weatherData.condition && option.day === weatherData.isDay) || defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
    
    return(
        <section className="weather-card">
            <p className="weather-card__temp">{weatherData.temp.F}&deg; F</p>
            <img src={weatherOption?.url} alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${weatherOption?.condition} weather`} className="weather-card__image" />
        </section>
    )
}

export default WeatherCard;