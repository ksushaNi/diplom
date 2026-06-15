const Router = require('express') // испортируем router из express
const router = new Router()
const TypeController = require('../controllers/typeController')
const checkRole = require('../middlewear/checkRoleMiddleware')
const authMiddleware = require('../middlewear/authMiddleware')
const adminMiddleware = require('../middlewear/adminMiddleware')
const typeController = require('../controllers/typeController')

router.post('/', checkRole('ADMIN'), TypeController.create)
router.get('/', TypeController.getALL)
router.put('/:id', checkRole('ADMIN'), typeController.update)
router.delete('/:id', checkRole('ADMIN'), typeController.delete)

module.exports = router // экспортируем router