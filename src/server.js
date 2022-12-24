const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('../src/utils/geoCode')
const getWeatherData = require('../src/utils/getWeatherData')

const publicDirectoryPath = path.join(__dirname ,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath =  path.join(__dirname, '../templates/partials')
const app = express()

//heroku usess en vari PORT
const port = process.env.PORT || 3000

//set handelbars engine to hbs
app.set('view engine', 'hbs')
//set where our views gona be
app.set('views', viewsPath)
//set partals templets
hbs.registerPartials(partialsPath)
//set where static files gonna be
app.use(express.static(publicDirectoryPath))



app.get('', (request, response) =>{
    response.render('index',{
        title: 'Weather',
        name: 'Jay'
    })
})


//help
app.get('/help', (request, response) =>{
    response.render('help',{
        title: 'Help',
        message: 'Hi there How can I help you today',
        name: 'Jay'
    })
})

//about
app.get('/about', (request, response) =>{
    response.render('about',{
        title: 'About',
        name: 'Jay'
    })
})

//about
app.get('/weather', (request, res) =>{
   if(!request.query.location){
        return res.send({
            error: "Location can not be empty"
        })
   }
   geoCode(request.query.location, (error, response)=>{
    if (error){
        return res.send({
            error
        })
    }
    else{
        getWeatherData(response, (error, data)=>{
            if (error){
                return res.send({
                    error
                })

            }else{
                res.send(data)
            }
        })
    }

});

})


app.get('*',(req, res)=>{
    res.send("404 Not Found")
})


app.listen(port, ()=>{
    console.log('server is running on localhost: ' + port)
})