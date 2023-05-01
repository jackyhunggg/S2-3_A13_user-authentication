// only using .env file while in non-production environment
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const mongoose  = require('mongoose')
const port = 3000

// setting connection to database
mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('mongoose error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// every data must be process with bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index')
})

// check if the username and password exist 
app.post('/', (req, res) => {
    // define email & password
    console.log(req.body)
    // use findOne to see if the data exist in the database
    // if yes, show welcome message
    // if no, show alert and redirect to main page
    res.render('index')
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})