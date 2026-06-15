const { Order, OrderItem, Product, User, Bascket, BascketProduct } = require('../models/models')
const { sendOrderConfirmation } = require('../services/emailService')

class OrderController {
    // Получить все заказы (для админа)
    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll({
                include: [
                    { model: User, attributes: ['id', 'email'] },
                    { model: OrderItem, include: [{ model: Product, attributes: ['id', 'name', 'img'] }] }
                ],
                order: [['createdAt', 'DESC']]
            })
            return res.json(orders)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: 'Ошибка при получении заказов' })
        }
    }

    // Получить заказы конкретного пользователя
    async getUserOrders(req, res) {
        try {
            const { userId } = req.params
            const orders = await Order.findAll({
                where: { userId },
                include: [{ model: OrderItem }],
                order: [['createdAt', 'DESC']]
            })
            return res.json(orders)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: 'Ошибка при получении заказов' })
        }
    }

    // Обновить статус заказа (админ)
    async updateOrderStatus(req, res) {
        try {
            const { id } = req.params
            const { status } = req.body

            const order = await Order.findByPk(id)
            if (!order) {
                return res.status(404).json({ message: 'Заказ не найден' })
            }

            order.status = status
            await order.save()

            return res.json({ message: 'Статус заказа обновлен', order })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: 'Ошибка при обновлении статуса' })
        }
    }
    async createOrder(req, res) {
        try {
            const { userId, address, phone, items, totalPrice } = req.body

            // Получаем пользователя
            const user = await User.findByPk(userId)

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' })
            }

            // Создаем заказ
            const order = await Order.create({
                userId,
                totalPrice,
                address,
                phone,
                status: 'НОВЫЙ'
            })

            // Создаем позиции заказа
            for (const item of items) {
                await OrderItem.create({
                    orderId: order.id,
                    productId: item.id,
                    productName: item.name,
                    price: item.price,
                    quantity: item.quantity
                })
            }

            // Очищаем корзину пользователя
            const bascket = await Bascket.findOne({ where: { userId } })
            if (bascket) {
                await BascketProduct.destroy({ where: { bascketId: bascket.id } })
            }

            await sendOrderConfirmation(user.email, order.id, order.totalPrice)

            return res.json({ message: 'Заказ успешно создан', order })

        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: 'Ошибка при создании заказа' })
        }
    }
}

module.exports = new OrderController()