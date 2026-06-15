require('dotenv').config()
const sequelize = require('./db')
const { Order, OrderItem } = require('./models/models')

async function update() {
    try {
        await sequelize.sync({ alter: true })
        console.log('Таблицы orders и order_items успешно созданы/обновлены')
        process.exit(0)
    } catch (e) {
        console.log('Ошибка:', e.message)
        process.exit(1)
    }
}

update()