const request = require('request')

const geocode = (address, callback) => {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address+'.json?access_token=pk.eyJ1IjoiYXJhdGFhb3NoaW1hIiwiYSI6ImNrYjVvMnF2aDBlMGUycm1wdWNxa3ZwcnoifQ.91OelghtSUqy11iwxF_vYA&limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXJhdGFhb3NoaW1hIiwiYSI6ImNrYjVvMnF2aDBlMGUycm1wdWNxa3ZwcnoifQ.91OelghtSUqy11iwxF_vYA&limit=1'

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect Location serices!', undefined);
        }else if(body.features.length === 0){
                callback('Unable to find Location. Try another search', undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })


}

module.exports = geocode

/*
const losUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYXJhdGFhb3NoaW1hIiwiYSI6ImNrYjVvMnF2aDBlMGUycm1wdWNxa3ZwcnoifQ.91OelghtSUqy11iwxF_vYA&limit=1'

request({url: losUrl, json:true}, (error, response) => {
    if(error){
        console.log("Location service is not available now")
    }else if(response.body.features.length === 0){
        console.log("Place not found!!")
    }
    else {
        console.log(response.body.features[0].center[0]) //lati
        console.log(response.body.features[0].center[1]) //long
    }
    
})
*/