const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middlewear/authMiddleware')
const adminMiddleware = require('../middlewear/adminMiddleware')

router.get('/', authMiddleware, adminMiddleware, orderController.getAllOrders)  // админ все заказы
router.get('/user/:userId', authMiddleware, orderController.getUserOrders)       // заказы пользователя
router.put('/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus) // обновить статус
router.post('/', authMiddleware, orderController.createOrder)

module.exports = router