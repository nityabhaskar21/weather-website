const request = require('request');

const geocode = (address, callback) => {
 
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoibml0eWFiaGFza2FyMjEiLCJhIjoiY2p3Z2tiMzNtMTFzNDQzbW9hNW1pYXNqaiJ9.662bW5t-RnWuJlSEE2PU-Q';

  request({url, json:true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location.Try another search', undefined);
    } else {
      callback(undefined, {
        latitude:body.features[0].center[1],
        longitude:body.features[0].center[0],
        location:body.features[0].place_name
      })
    }
    
  })
}

module.exports = geocode;