import {utcToZonedTime} from 'date-fns-tz'

// Retorna horario atual com timezone (hh:mm) 
export function formatToLocalTime(timezone){
    if(timezone != null){
        // Recuperar data Atual
        const date = new Date().getTime()
        // Passar a Timezone para o Horario atual
        const horario = utcToZonedTime(date, timezone)
        // Recuperar Hora e Minuto e passar para int
        const hora = parseInt(horario.getHours())
        const minuto = parseInt(horario.getMinutes())
        // Verificar a quantidade de caracteres e passar para String
        const minutoStr = (minuto>=10)?minuto.toString():"0"+ minuto.toString()
        const horaStr = (hora>=10)?hora.toString():"0" + hora.toString()
        return horaStr + ":" + minutoStr
    }
}
// Retorna a data atual com timezone (dd/MM/aaaa) 
export function formatToLocalDate(timezone){
    if(timezone != null){
        // Recuperar Data com Timezone
        const dataLocal = timezone
        // Recuperar Dia & Mês e passar para int
        const dia = parseInt(dataLocal.getDate())
        const mes = parseInt(dataLocal.getMonth())
        // Verificar a quantidade de caracteres e passar para String
        const diaStr = (dia>=10)?dia.toString():"0"+ dia.toString()
        const mesStr = (mes>=10)?mes.toString():"0" + mes.toString()
        // Recupera o Ano 
        const anoStr = dataLocal.getFullYear().toString()
        return diaStr + "/" + mesStr + "/" + anoStr
    }
}
// Retorna objeto Date() atual com timezone (new Date())
export function getDateByTimezone(timezone){
    if(timezone != null){
        const date = new Date().getTime()
        return utcToZonedTime(date, timezone)
    }
}
// Retorna a quantidade de dias em um  mês
export function verifyDaysInMonth(month){
    switch(month){
        case 0,2,4,6,7,9,11:
            return 31
        case 1:
            return 28
        case 3,5,8,10:
            return 30
    }
}
