const request = require('request');
const geoCode = (address, callback) =>{
    const geoCodeUrl ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamF5bmFyaXlhIiwiYSI6ImNsYnpjZmsxODA0d3AzcHQ2Mmg4Zm41bXoifQ.ebX-Sj8Xfmmx6yPr2nZQDw&limit=1'
    
    request( { url: geoCodeUrl, json: true}, (error, {body}={}) =>{
        if(error){
            callback("Uable to connect to location services", undefined)
        }else if(body.features.length ===0){
            callback("No Location Found Try another search", undefined)
        }else{
           callback(undefined, {
            longtitude: body.features[0].center[0],
            latitude: body.features[0].center[1],
            location: body.features[0].place_name
           })
        }

    })

}

module.exports = geoCode