const request = require('request');

const getWeatherData = ({location,longtitude,latitude}={}, callback) =>{
    const WeatherUrl = 'http://api.weatherstack.com/current?access_key=e3c70e650e99ad584d2a4616b617a349&query='+ encodeURIComponent(location)
    
    request( { url: WeatherUrl, json: true}, (error, {body}) =>{
            if(error){
                    callback("unable to connect Weather Service", undefined)
                }else if(body.error){
                    callback(body.error.info, undefined)
                }else{
                    callback( undefined, {
                        Type: body.current.weather_descriptions[0],
                        temprature: body.current.temperature,
                        location,
                        longtitude,
                        latitude
                    });
                }
    })
}

module.exports = getWeatherData