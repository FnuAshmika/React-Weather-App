import { useState, useEffect, useContext } from "react";
import { DataContext } from "../contexts/DataProvider";
import { useParams } from "react-router-dom";
import City from "../components/City";


export default function Weather() {
    const { uid, id } = useParams()
    const [cityData, setCityData] = useState({})
    const [weatherData, setWeatherData] = useState({})
    const [loadingState, setLoadingState] = useState("LOADING")
    const [error, setError] = useState(false)
    const { getCity, getWeather } = useContext(DataContext)
    const apiKey =process.env.REACT_APP_API_KEY
    
    useEffect(() => {
        async function handleload() {
            try {
                const data = await getCity(uid, id)
                setCityData(data)
                console.log(data)
                console.log(apiKey)
                const name = data.name
                console.log(data.name)
                const weather = await getWeather(name, apiKey)
                if(weather.cod!="200")
                {setError(true)}
                else{
                setWeatherData(weather)
                console.log(weather)
                setLoadingState("LOADED")}


            } catch (err) { setError(true) }



        }
        handleload()

    }, [])

    return (
        <div className="card">
            {error ? <>
                <h1>404 Page not found</h1>
            </> : <>
                <div className="weather">
                    {(loadingState === "LOADING") ?
                        <p>Loading...</p> : <>
                            <City city={cityData} hideLink={true} />

                            <div className="inner-weather">
                                
                                <h1>{weatherData.main.temp}°F</h1>
                                <div className="description">
                                    <h6>{weatherData.weather[0].description}</h6>
                                    <img
                                        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                                        alt={weatherData.weather[0].description}
                                        style={{ width: '100px', height: '100px', margin: '0px' }}

                                    />

                                </div>

                                <h4>Feels Like: {weatherData.main.feels_like}°F</h4>

                                <h4>H: {weatherData.main.temp_max}°F || L: {weatherData.main.temp_min}°F </h4>
                                {/* <h4>Min: {weatherData.main.temp_min}°F</h4> */}
                                <h3>{weatherData.sys.country}</h3>
                            </div>
                        </>}</div>
            </>

            }

        </div>
    )

}