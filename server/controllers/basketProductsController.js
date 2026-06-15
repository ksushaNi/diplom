const {BascketProduct} = require('../models/models')
const ApiError = require('../error/apiError');

class BascketProductController  {
    //добавление товара в корзину
    async create  (req, res){
        const {bascketId, productId} = req.body
        const bascket = await BascketProduct.create({bascketId, productId})
        return res.json(bascket)
    }
    //получение всего содержимого корзины
    async getALL   (req, res){
        const bascket = await BascketProduct.findAll()
        return res.json(bascket)
    }   
    //получение корзины конкретного пользователя
    async getUserBascket(req, res) {
        const { userId } = req.params
        
        // Находим корзину пользователя
        const userBascket = await Bascket.findOne({ 
            where: { userId },
            include: [{ model: BascketProduct }]
        })
        
        if (!userBascket) {
            return res.json({ products: [] })
        }
        return res.json(userBascket)
    }
}

module.exports = new BascketProductController()