const path=require('path')
const express = require('express')
const hbs = require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const PORT = process.env.PORT || 3001 
//Define path for Express config

const publicPath=path.join(__dirname,'../public')
const viewPath =path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handlebars engine and view location

app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve

app.use(express.static(publicPath)) 

app.get('/', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Saurabh Singh'
    })
})


app.get('/about', (req, res) => {
    res.render('about',{
        name: 'saurabh singh',
        age: 21,
        degree: 'B.tech',
        location: 'Meerut'
    })
})


app.get('/help', (req, res) => {
    res.render('help',{
        name: 'saurabh singh',
        email: 'srv2699@gmail.com',
        phone: 9548950844,
        location: 'Meerut'
    })
})


app.get('',(req,res)=>{
    res.send("Hello world I am a loser!!")
}
)


app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send(error)
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })

})

app.get('/products', (req,res)=>{

    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide  a search term!!!'
        })
    }

    console.log(req.query.search)

    res.send({
        products:[]
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'saurabh singh',
        errorMessage: 'Page not found:/'    
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        
        title:'404',
        name:'saurabh singh',
        errorMessage:'Help page not found:('
    })
})


app.listen(PORT, () => {
    console.log("The server is running on port "+ PORT)
})