const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/0722c5beee7a16d5ff42783d9204bf06/' + latitude +
              ',' + longitude;
  
  request({url, json:true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather services!',undefined);
    } else if (body.error) {
      callback('unable to  find location!',undefined)
    } else {
      const { temperature, precipProbability} = body.currently;
      callback(undefined,`${body.daily.data[0].summary} Temp is ${temperature}F and there is ${precipProbability}% chance of rain .`)
    }
  })
}

module.exports = forecast;
