const express = require('express');
const session = require('express-session');
const https = require('https')
const fileupload = require('express-fileupload');
const cors = require('cors');
const app = express();
var path = require('path');

const timezoneServices = require('./Timezone/index.js');

// Porta de Saida
const port = process.env.PORT || 5000;

app.use(cors({methods:['GET']}));
app.use(session({secret: 'shauidxfvyuigfuifvyuifyiuuiaxvsaxsauisavasui'}));
app.use(express.json());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp')
}));
// Inicializando Servidor Node
app.listen(port,()=>{
    console.log('Rodando na porta 5000...');
})
app.get('/:name/:lat/:lon',(req,res)=>{
    const name = req.params.name
    const lat = req.params.lat
    const lon = req.params.lon
    const url =  `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&lang=pt_br&exclude=minutely,alerts&appid=2933fdc575fb70fe1fc480000280d512`
    https.get(url, (res2)=>{
        let body = '';
        res2.on('data', function (chunk) {
            body += chunk;
        });
        res2.on('end', function () {
                const forecast = JSON.parse(body);
                if(forecast != null){
                    // Recuperando Timezone
                    const timezone = (forecast.timezone != null)&&forecast.timezone
                    const dataTimezone = (timezone != null)&&timezoneServices.getDateByTimezone(timezone)
                    const dataDMA = timezoneServices.formatToLocalDate(dataTimezone)

                    // Recuperando Dados da API
                    const previsaoDoDia = (forecast.daily[0] != null)?forecast.daily[0]:[]
                    const forecastDay = {
                        forecast:previsaoDoDia,
                        dataDMA:dataDMA,
                        timezone:dataTimezone,
                        placeName:name
                    }

                    const forecastHour = {
                        forecast:forecast.hourly,
                        timezone:dataTimezone
                    }
                    const forecastWeek = {
                        forecast:forecast.daily,
                        timezone:dataTimezone
                    }
                    const forecastFinal = {cod:'200', forecastDay:forecastDay, forecastHour:forecastHour, forecastWeek:forecastWeek}
                    res.json(forecastFinal)
                }
            })}
        )
});