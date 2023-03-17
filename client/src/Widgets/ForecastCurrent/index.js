import { useState, useEffect } from "react"
import './style.css' 

export default function ForecastCurrent(props){
    
    // Recuperando o Clima Atual
    const [localName, setLocalName] = useState('')
    const [timezone, setTimezone] = useState( { dataDMA:null, tz:'' } )
    const [forecastCurrent, setForecastCurrent] = useState(null)
    useEffect(()=>{
        if(props.forecast != null){
            if(
                props.forecast.forecast != null && 
                props.forecast.placeName != null &&
                props.forecast.timezone != null &&
                props.forecast.dataDMA != null
            ){
                // Recuperando Previsão do Dia
                setForecastCurrent(props.forecast.forecast)

                // Recuperando nome do local
                setLocalName(props.forecast.placeName)

                // Recuperando Timezone
                setTimezone({
                    dataDMA:props.forecast.dataDMA,
                    tz:props.forecast.timezone
                })

            }
        }
    },[props.forecast])

    // Alterando a UI com os dados do Clima Atual
    const [campoDataDia, setCampoDataDia] = useState('')
    const [campoDataHora, setCampoDataHora] = useState('')
    const [campoTemperatura, setCampoTemperatura] = useState('')
    const [campoTemperaturaST, setCampoTemperaturaST] = useState('')
    const [campoVelocidadeVento, setCampoVelocidadeVento] = useState('')
    const [campoPrecipitacao, setCampoPrecipitacao] = useState('')
    const [campoIcon, setCampoIcon] = useState('icons/weather.png')
    useEffect(()=>{
        if(forecastCurrent!=null){
            // Mudar Campo Temperatura ( °C )
            const temperatura = (forecastCurrent.temp.day - 273.15).toString().slice(0,4)
            setCampoTemperatura(temperatura)
            // Mudar Campo Sensação Termica ( °C )
            const temperaturaST = (forecastCurrent.feels_like.day - 273.15).toString().slice(0,4)
            setCampoTemperaturaST(temperaturaST)
            // Mudar Campo Velocidade do Vento ( m/s )
            setCampoVelocidadeVento(forecastCurrent.wind_speed)
            // Mudar Campo Precimpitação ( mm/h )
            setCampoPrecipitacao(forecastCurrent.pop * 100)
            // Recuperar icon
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${forecastCurrent.weather[0]["icon"]}.svg`
            setCampoIcon(icon)

        }
    },[forecastCurrent])

    // Formatando Relógio
    function formatToLocalTime(timezone){
        if(timezone != null){
            // Recuperar data Atual
            const dateTz = new Date(timezone)
            // Recuperar Hora e Minuto e passar para int
            const hora = parseInt(dateTz.getHours())
            const minuto = parseInt(dateTz.getMinutes())
            // Verificar a quantidade de caracteres e passar para String
            const minutoStr = (minuto>=10)?minuto.toString():"0"+ minuto.toString()
            const horaStr = (hora>=10)?hora.toString():"0" + hora.toString()
            return horaStr + ":" + minutoStr
        }
    }
    // Passando dados do Timezone para UI
    useEffect(()=>{
        if(timezone != null){
            if(timezone.dataDMA != null && timezone.tz != null){
                // Mudar Campo Data Dia ( dd/MM/aaaa )
                setCampoDataDia(timezone.dataDMA)
                // Mudar Campo Data Hora ( hh/mm ) Relogio
                setCampoDataHora(formatToLocalTime(timezone.tz))
                const interval = setInterval(()=>{
                    setCampoDataHora(formatToLocalTime(timezone.tz))
                },10000)
                return () => clearInterval(interval)                
            }
        }
    },[timezone])

    return(
        <div className="forecast-current-container">           
            <div className="top">
                <div className="top-infos">
                    <span className="nome-lugar">{localName}</span>
                    <span className="data">
                        <span className="dia">{campoDataDia}</span>
                        <span className="hora">{campoDataHora}</span>
                    </span>                           
                </div>
                <img className="icon-day" src={campoIcon} alt="Icon Weather"/>
            </div>
            <div className="bottom">
                <div className='info-container first'>
                    <span className='header'>Temperatura</span>
                    <span className='span-value'>{campoTemperatura}<b title="Graus celcius!">°C</b></span>
                </div>
                <div className='info-container'>
                    <span className='header'>Sensação Termica</span>
                    <span className='span-value'>{campoTemperaturaST}<b title="Graus celcius!">°C</b></span>
                </div>
                <div className='info-container'>
                    <span className='header'>Velocidade do vento</span>
                    <span className='span-value'>{campoVelocidadeVento} <b title="Metro por segundo!">m/s</b></span>
                </div>
                <div className='info-container'>
                    <span className='header'>Chances de Chuva</span>
                    <span className='span-value'>{campoPrecipitacao}<b title="Chance de chuva!">%</b></span>
                </div>
            </div>
        </div>
    )
}