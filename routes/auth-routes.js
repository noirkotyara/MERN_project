const {Router} = require('express')
const User = require('../models/User')
const router = Router()
// /api/auth
router.post('/register', async (req, res) => {
    try{
        // const {email, password} = req.body
    }catch(e){
        res.status(500).json({message: `It is an error in /register request, try again)`})
    }
})
router.post('/login', async (req, res) => {
    try{
        
    }catch(e){
        res.status(500).json({message: `It is an error in /login request, try again)`})
    }
})


module.exports = router