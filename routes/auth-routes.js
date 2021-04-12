const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()
// /api/auth
router.post('/register',
    [
        check('email', 'An email is incorrect').isEmail(),
        check('password', 'The password can`t be less than 6 characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const { email, password } = req.body
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: 'Validation is not passed(' })
            }
            

            const isUserExisting = await User.findOne({ email })
            if (isUserExisting) {
                Promise.reject("the user is already exists")
                return res.status(400).json({ message: 'The user is already exists' })
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })
            await user.save()
            res.status(201).json({ message: 'User is created' })

        } catch (e) {
            res.status(500).json({ message: `It is an error in /register request, try again)` })
        }
    })
router.post('/login',
    [
        check('email', 'An email is incorrect').normalizeEmail().isEmail(),
        check('password', 'The password should be exist').exists()
    ],
    async (req, res) => {
        try {
            const { email, password } = req.body  
            const errors = validationResult(req)
            
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: 'Validation is not passed(' })
            }
            
          
            const user = await User.findOne({ email })
            if (!user) {
                Promise.reject("the user is not yet existed")
                return res.status(400).json({ message: 'The user is not yet existed' })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({message: 'Password is incorrect'})
            }
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn:'1h'}
            )
             res.json({token})   

        } catch (e) {
            res.status(500).json({ message: `It is an error in /login request, try again)` })
        }
    })


module.exports = router