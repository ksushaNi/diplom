const Router = require('express') // испортируем router из express
const router = new Router() // создаем объект router
// импортируем объекты
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const orderRouter = require('./orderRoutes')
// указываем, что остальные роуетеры явдяются подроутерами
// настраиваем маршрутыA
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)

module.exports = router // экспортируем router