import { useState, useEffect } from 'react'
import './style.css'

// Import Timezone Services 
import {verifyDaysInMonth} from '../../API/Timezone'

export default function ForecastWeek(props){
    
    // Recupera Previsão da Semana
    const [dataLocal, setDataLocal] = useState({date:0,monthDays:0})
    const [forecastWeek, setForecastWeek] = useState([])
    useEffect(()=>{
        if(props.forecast.forecast != null && props.forecast.timezone != null){
            // Recuperando previsao da semana
            setForecastWeek(props.forecast.forecast)
            // Recuperando Data com Fuso Horario
            const dataTz = new Date(props.forecast.timezone)
            // Recupera a quantidade de dias no mês
            const monthDays = verifyDaysInMonth(dataTz.getMonth())
            setDataLocal({date:dataTz,monthDays:monthDays})
        }
    },[props.forecast])

    return(
        <div className='forecast-week-container'>
            <span className='header-main'>Previsão da Semana</span>
            <div className='forecast-week-list'>
                {
                    forecastWeek.map((day, key)=>{

                        // Recuperar Icon URL
                        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${day.weather[0]["icon"]}.svg`

                        // Recuperar Day
                        const data = dataLocal.date.getDate() + key
                        const dataEdit = (data>dataLocal.monthDays)?data - dataLocal.monthDays:data 
                        const dataFinal = (dataEdit.toString().length == 1)?"0" + dataEdit:dataEdit

                        // Recuperar Temp
                        const temperatura =(day.temp.day - 273.15).toString().slice(0,4)

                        return(
                            <div className='forecast-week-item' key={key}>
                                <div className='info-container first'>
                                    <span className='header'>Dia</span>
                                    <span className='span-dia'>{dataFinal}</span>
                                </div>
                                <div className='info-container'>
                                    <span className='header'>Previsao do Tempo</span>
                                    <div className='weather-info'>
                                        <img src={icon} alt="Weather Icon "/>
                                        <span className='span-weather'>{day.weather[0].main}</span>
                                    </div>
                                </div>
                                <div className='info-container'>
                                    <span className='header'>Temperatura em °C</span>
                                    <span className='span-temp'>{temperatura}°C</span>
                                </div>
                            </div>
                        )
                    })
                }                
            </div>
            
        </div>
    )
}