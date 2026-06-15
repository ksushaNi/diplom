const uuid = require('uuid')
const path = require('path')
const { Product, ProductInfo } = require('../models/models')
const ApiError = require('../error/apiError')

class ProductController {
    //создание блюда
    async create(req, res, next) {
        try {
            let { name, price, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({ name, price, typeId, img: fileName })
            if (info) {
                info = JSON.parse(info)
                info.forEach(element => {
                    ProductInfo.create({
                        title: element.title,
                        description: element.description,
                        productId: product.id
                    })
                });
            }
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    //возврат всех блюд
    async getALL(req, res, next) {
        try {
            let { typeId, limit, page, search } = req.query
            const { Op } = require('sequelize')

            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit

            let where = {}
            if (typeId) where.typeId = typeId
            if (search && search.trim() !== '') {
                where.name = { [Op.iLike]: `%${search}%` }
            }

            console.log('Search query:', search)  
            console.log('Where clause:', where)

            const products = await Product.findAndCountAll({
                where,
                limit,
                offset,
                include: [{ model: require('../models/models').Type, attributes: ['name'] }]
            })
            return res.json(products)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
    //возврат одного блюда
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const product = await Product.findOne({
                where: { id },
                include: [{ model: ProductInfo, as: 'info' }]
            })
            return res.json(product)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
    //изменение блюда
    async update(req, res, next) {
        try {
            const { id } = req.params
            const { name, price, typeId, rating, description } = req.body

            const product = await Product.findByPk(id)
            if (!product) {
                return next(ApiError.badRequest('Блюдо не найдено'))
            }

            // Если есть новое изображение
            if (req.files && req.files.img) {
                const { img } = req.files
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                product.img = fileName
            }
            product.name = name || product.name
            product.price = price || product.price
            product.typeId = typeId || product.typeId
            product.rating = rating !== undefined ? rating : product.rating
            product.description = description !== undefined ? description : product.description

            await product.save()
            return res.json(product)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
    //удаление блюда
    async delete(req, res, next) {
        try {
            const { id } = req.params
            const product = await Product.findByPk(id)

            if (!product) {
                return next(ApiError.badRequest('Блюдо не найдено'))
            }

            // Удаляем связанные ProductInfo
            await ProductInfo.destroy({ where: { productId: id } })

            // Удаляем сам продукт
            await product.destroy()

            return res.json({ message: 'Блюдо удалено' })
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new ProductController()