const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname,'../public'));

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title:'Weather App',
    name:'Nityanand Bhaskar'
  })
})

app.get('/help', (req, res) => {
  res.render('help',{
    name:'Nityanand Bhaskar',
    age:22,
    title:'help'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title:'About me',
    name:'Nityanand Bhaskar'
  });
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({error:'Please provide address to get data!'});
  }
  geocode(req.query.address, (error, {latitude, longitude,location} = {}) => {
    
    if(error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send ({error})
      }
      res.send({
        address:req.query.address, location, forecast:forecastData,latitude,longitude
      })
    })
  })

})

app.get('/products', () => {
  res.send({
    products:[],
  })
})

app.get('/help/*',(req, res) => {
  res.render('404',{errorMsg:'Help article not found!',name:'Nityanand Bhaskar'})
})

app.get('*',(req, res) => {
  res.render('404',{errorMsg:'Page not found!',name:'Nityanand Bhaskar'})
})

app.listen(3000, () => {
  console.log('Server running')
}) 
 



//123456789!@#$%^&*() => {}