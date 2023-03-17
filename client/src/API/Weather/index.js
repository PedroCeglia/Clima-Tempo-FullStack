import axios from 'axios'

const weatherForecastApi = axios.create({
    baseURL:`https://clima-tempo-api.herokuapp.com`
}) 

// Recuperamos a Previsão da Semana e do Dia a partir de uma latitude e uma longitude
export async function getWeatherByLatLon(lat, lon, setWeather, name){
    const req = `/${name}/${lat}/${lon}`
    const response = await weatherForecastApi.get(req);
    const weather = response.data
    setWeather(weather)
}