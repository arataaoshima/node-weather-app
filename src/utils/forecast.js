const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8c9a2438a5c3aaee871cc696954e6cb8&query=' + latitude + ',' + longitude

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect Weather serices!', undefined);
        }else if(body.error){
            callback('Unable to find Location. Put the correct Address', undefined)
        }else {
           // callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
            callback(undefined, {
                temp: body.current.temperature,
                condition: body.current.weather_descriptions[0],
               humidity: body.current.humidity,
                place: body.location.name
     
            })
       
        }

    })
}

module.exports = forecast



/*
const url = 'http://api.weatherstack.com/current?access_key=8c9a2438a5c3aaee871cc696954e6cb8&query=37.8267,-122.4233'
// F => http://api.weatherstack.com/current?access_key=8c9a2438a5c3aaee871cc696954e6cb8&query=37.8267,-122.4233%units=f

request({ url: url, json: true}, (error, response) => {

    //console.log(response.body.current.weather_descriptions[0])


   if(error){
        console.log('Weather service is not availalbe!!')
   }else if(response.body.error){
        console.log('Unable to find location')
   }
   else {
    const temp = response.body.current.temperature
    const condition = response.body.current.weather_descriptions[0]
    const humidity = response.body.current.humidit
    const place = response.body.location.name
    console.log('Here is '+ place)
    console.log('The current temperature is '+temp + ' degree')
    console.log('The current weather is '+ condition)
    console.log('The current humidity is '+ humidity)
   }
   
})
*/