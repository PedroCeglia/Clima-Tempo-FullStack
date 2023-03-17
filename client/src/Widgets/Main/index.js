import { useState, useEffect } from "react";
import "./style.css"

// Import Widgets
import Header from "../Header";
import SearchView from "../SearchView";
import ForecastWeek from "../ForecastWeek";
import ForecastDay from "../ForecastDay";
import ForecastCurrent from "../ForecastCurrent";
import ForecastWithout from "../ForecastWithout";

// Import Services
import { getWeatherByLatLon } from "../../API/Weather";

export default function Main(){

    // Recuperando Endereço & Clima
    const [hasForecast, setHasForecast] = useState('content hasnt')
    const [search, setSearch] = useState({ placeName:"", lat:null, lng:null })
    const [forecast, setForecast] = useState(null);
    useEffect(()=>{
        if(search.lat != null && search.lng != null && search.placeName != ""){
            // Reiniciar UI
            setHasForecast('content loading')
            // Buscar Por Respostas
            getWeatherByLatLon(search.lat, search.lng, setForecast, search.placeName)
        }
    },[search])

    // Configuração Inicial
    const forecastDefault = { cod:404, forecastHour:[], forecastDay:[], forecastWeek:[] }
    const [forecastWeek, setForecastWeek] = useState({
        forecast:[],
        timezone:null
    })
    const [forecastHour, setForecastHour] = useState({
        forecast:[],
        timezone:null
    })
    const [forecastCurrent, setForecastCurrent] = useState({
        forecast:null,
        dataTimezone:null,
        timezone:'',
        name:''
    }) 
    useEffect(()=>{
        if(forecast != null && forecast.cod === '200'){
            // Recuperando Dados da API
            if(forecast.forecastHour != null){setForecastHour(forecast.forecastHour)}
            if(forecast.forecastDay != null){setForecastCurrent(forecast.forecastDay)}
            if(forecast.forecastWeek != null){setForecastWeek(forecast.forecastWeek)}
            setHasForecast('content has')
        } else{
            setHasForecast('content hasnt')
        }

    },[forecast])

    return(
        <div className='clima-tempo-container'>
            <Header setSearch={setSearch}/>
            <div className={hasForecast}>
                <section className="loading-forecasts-container">
                    <img src="icons/loading.png" alt="Loader Icon"/>
                </section>
                <ForecastWithout/>
                <section className="forecasts-container">
                    <div className="left">
                        <ForecastCurrent forecast={forecastCurrent}/>
                        <ForecastDay forecast={forecastHour}/>
                    </div>
                    <ForecastWeek forecast={forecastWeek}/>
                </section>
            </div>
        </div>
    )
}