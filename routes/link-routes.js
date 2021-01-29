const { Router } = require('express')
const shortid = require('shortid')
const config = require('config')
const auth = require('./../middlewares/auth-middleware')
const Link = require('./../models/Link')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const { from } = req.body

        const code = shortid.generate()
        const existing = await Link.findOne({from})
        if(existing){
            return res.json({link: existing})
        }

        const to = baseUrl + '/t/' + code
        const link = new Link ({code, from, to, owner: req.user.userId})
        await link.save() //async
        res.status(201).json({link})
    } catch (e) {
        res.status(500).json({ message: `It is an error in /generate request, try again)` })
    }
})

router.get('/', auth, async (req,res) => {
    try{
        const linkslist = await Link.find({owner: req.user.userId})
        res.json(linkslist)
    }catch(e){
        res.status(500).json({message: `It is an error in /(get method of links) request, try again)`})
    }
})


router.get('/:id', auth, async (req,res) => {
    try{
        const linkDetails = await Link.findById(req.params.id)
        res.json(linkDetails)
    }catch(e){
        res.status(500).json({message: `It is an error in /:id (get details : method of links) request, try again)`})
    }
})


module.exports = router
