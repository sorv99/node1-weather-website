const request =require('request')

const forecast = (latitude,longitude,callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=fd08d48b2dbbf7d04a898c4416c4b7d7&query=' +latitude +',' + longitude +'&units=m'

    request({url: url, json: true},(error,{body})=>{
        if(error)
        {
            callback("Unable to connect!!",undefined)
        }
        else if (body.error)
        {
            callback("Unable to find the location!!",undefined)
        }
        else{
            callback(undefined,
                body.current.weather_descriptions[0]+". The temperature in " + body.location.name + " is " +body.current.temperature +" degrees!!! "+ "And it feels like " + body.current.feelslike +" degrees!! . Humidity is "+ body.current.humidity +"%. This data was observerd at "+ body.current.observation_time)
        }
    })

}

module.exports= forecast