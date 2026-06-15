//const { json } = require("sequelize")
const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Bascket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    //функция регистрации
    async registration (req, res, next){
        const {email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Неккоректный email или password'))
        }
        //проверка на существование пользователя в БД
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password:hashPassword})
        const bascket = await Bascket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
    }
    //функция входа
    async login (req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.internal('Пользователь не найден!'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('Указан неверный пароль!'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    //функция проверки регистрации пользователя
    async check (req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
    // Получить всех пользователей (только для ADMIN)
async getAllUsers(req, res, next) {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // не показываем пароли
        })
        return res.json(users)
    } catch (e) {
        return next(ApiError.internal('Ошибка получения пользователей'))
    }
}
}
//экспортируем данные
module.exports = new UserController()