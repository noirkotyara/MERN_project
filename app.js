const express = require ('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || config.get('port')  

//middleware
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth-routes'))
app.use('/api/link', require('./routes/link-routes'))
app.use('/t', require('./routes/redirect-routes'))
app.use(cors())
// app.get('/', (req, res) => { res.send('Hello from Express!')})

const start = async() => {
    console.log('START')
    try {
        await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        //after successfull connection to mongoBD
        app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
    }
    catch(e){
        console.log(`Ooops it is Server Error ${e.message}`)
        process.exit(1)
    }
}

//fix: refactor hard coded connection string to Heroku config var

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  
  app.get('*', (req, res) => {
          res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
        });
}


start()


