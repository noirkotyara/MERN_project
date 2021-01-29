const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if(req.method === 'OPTION'){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1] //Bearer token ~ we need to take only token
        if(!token){
            return res.status(401).json({message: 'User is not authenticated'})
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        // our decoded token {userId: user.id},
        //  config.get('jwtSecret'),
        //  {expiresIn:'1h'}
        req.user = decoded // user.userId for using
        next()
        
    }catch(e){
        res.status(401).json({message: 'User is not verified'})
    }
}