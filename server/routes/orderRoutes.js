// const Router = require('express')
// const router = new Router()
// const orderController = require('../controllers/orderController')
// const authMiddleware = require('../middlewear/authMiddleware')
// const adminMiddleware = require('../middlewear/adminMiddleware')

// router.get('/', authMiddleware, adminMiddleware, orderController.getAllOrders)  // админ все заказы
// router.get('/user/:id', authMiddleware, orderController.getUserOrders)       // заказы пользователя
// router.put('/status/:id', authMiddleware, adminMiddleware, orderController.updateOrderStatus) // обновить статус
// router.post('/', authMiddleware, orderController.createOrder)

// module.exports = router
const Router = require('express')
const router = new Router()

// Временно просто возвращаем сообщение
router.get('/', (req, res) => res.json({ message: 'Orders route works' }))
router.get('/user/:id', (req, res) => res.json({ message: `User orders for ${req.params.id}` }))
router.put('/status/:id', (req, res) => res.json({ message: `Update status for ${req.params.id}` }))
router.post('/', (req, res) => res.json({ message: 'Create order' }))

module.exports = router