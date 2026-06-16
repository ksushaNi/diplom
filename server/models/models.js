const sequelize =require('../db')
const {DataTypes} = require('sequelize')
//описание модели пользователя
const User = sequelize.define( 'user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue:"USER"},
})

//описание модели сущности корзины пользователя
const Bascket = sequelize.define( 'bascket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: { type: DataTypes.INTEGER, allowNull: false }
})

//описание модели сущности корзины с товарами
const BascketProduct = sequelize.define( 'bascket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

//описание модели сущности корзины с товарами
const Product = sequelize.define( 'product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
    typeId: {type: DataTypes.INTEGER, allowNull: false},
    description: { type: DataTypes.TEXT, allowNull: true }
})
//описание модели сущности типов товаров 
const Type = sequelize.define( 'type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
//описание модели сущности рейтинга
const Rating = sequelize.define( 'rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})
//описание модели сущности информации о товаре
const ProductInfo = sequelize.define( 'product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Order = sequelize.define('./order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    totalPrice: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'НОВЫЙ' },
    address: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
})
const OrderItem = sequelize.define('./oredrItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    productName: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
})

//настройка связей моделей
User.hasOne(Bascket)//связь между пользователем и корзиной(1:1)
Bascket.belongsTo(User)//корзина пренадлежит пользователю

User.hasMany(Rating)//связь между пользователем и оценками(1:М)
Rating.belongsTo(User)

Bascket.hasMany(BascketProduct)//связь корзины пользователя и корзины с товарами(1:М)
BascketProduct.belongsTo(Bascket)

Type.hasMany(Product)//связь типа продукта и продукта(1:М)
Product.belongsTo(Type)

Product.hasMany(Rating)//связь рейтинга и продукта(1:М)
Rating.belongsTo(Product)

Product.hasMany(BascketProduct)//связь продукта и корзины с продуктами(1:М)
BascketProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'info'})//связь между продуктом и информацией о продукте(1:М)
ProductInfo.belongsTo(Product)

User.hasMany(Order)//связь пользователя и заказов(1:М)
Order.belongsTo(User)

Order.hasMany(OrderItem)//связь заказа и позицией заказа(1:М)
OrderItem.belongsTo(Order)

Product.hasMany(OrderItem)//связь товара и позициями заказа(1:М)
OrderItem.belongsTo(Product)

//экспорт моделей для их дальнейшего использования в других файлах
module.exports = {
    User,
    Bascket,
    BascketProduct,
    Product,
    Type,
    Rating, 
    ProductInfo, 
    Order,
    OrderItem
}