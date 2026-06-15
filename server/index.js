require('dotenv').config()
const express = require('express')
const sequelize = require('./db') //импорт объекта из файла db
const models = require('./models/models')//импорт моделей из файла models
const cors = require('cors')//импортируем модуль cors
const PORT = process.env.PORT || 5000
const router = require('./routes/index')
const errorHandler = require('./middlewear/ErrorHandlingMiddleware')
const fileUpLoad = require('express-fileupload')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpLoad({}))
app.use('/api', router)
app.use((req, res, next) => {
    res.removeHeader('Content-Security-Policy')
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate() //подключение к БД
        await sequelize.sync({ alter: true }) //сверка состояния БД со схемой данных 
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
