const jwt = require('jsonwebtoken')

//проверка токена на валидность
module.exports = function(req, res, next) {
    if (req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            return res.status(401).json({message: "Не авторизован"})
        } 
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};