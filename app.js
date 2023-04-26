// only using .env file while in non-production environment
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const mongoose  = require('mongoose')
const port = 3000

// setting connection to database
mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('mongoose error!')
})

db.once('connection', () => {
    console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
app.get('/', (req, res) => {
  res.render('index')
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})