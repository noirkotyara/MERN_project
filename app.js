const express = require ('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const PORT = config.get('port') || 5000

//middleware
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth-routes'))


const start = async() => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
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
start()


