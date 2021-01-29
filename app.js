const express = require ('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || config.get('port')  

//middleware
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth-routes'))
app.use('/api/link', require('./routes/link-routes'))
app.use('/t', require('./routes/redirect-routes'))

const start = async() => {
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

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

start()


