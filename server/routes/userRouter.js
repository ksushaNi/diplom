const Router = require('express') // испортируем router из express
const router = new Router()
const userController = require('../controllers/userController')//импортируем соответствующий котнроллер
const authMiddleware = require('../middlewear/authMiddleware')
const checkRole = require('../middlewear/checkRoleMiddleware')

router.post('/registration', userController.registration)//регистрация
router.post('/login', userController.login)//авторизация
router.get('/auth', authMiddleware, userController.check)//проверка авторизован ли пользователь
router.get('/', checkRole('ADMIN'), userController.getAllUsers)

module.exports = router // экспортируем router