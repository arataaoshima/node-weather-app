const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()

//Define path for Express Config
const publicDirectlyPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// dynamic templates >> Setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectlyPath))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Arata' App"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me!!",
        name: "Arata"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Me!!",
        name: "Arata"
    })
})
//app.get('', (req, res) => {
 //   res.send('<h1>Weather</h1>')
//})
/*
app.get('/help', (req, res) => {
    res.send([{
        name: "Arata",
        age:31,
        place: "Vancouver"
    },{
        name: "Sarah",
        age:34,
        place: "NYC"
    }]
     )
})

app.get('/about', (req, res)=> {
    res.send('<h1>About Us</h1>')
})
*/
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address!"
        })
    }
    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
 /*
 
    console.log(req.query.address)
    res.send({
        forecast: "sunny",   
        place: req.query.address
    })

 */   
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
})



app.get('/help/*',(req, res)=> {
    res.render('error',{
        title: "Error",
        message:'Help article not found',
        name: "Arata"
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title: 'Error',
        message: 'My 404 Page',
        name:"Arata"
    } )
})


app.listen(3000, () => {
    console.log("Server is up on port 3000")
})