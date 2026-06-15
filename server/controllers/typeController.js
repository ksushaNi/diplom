const {Type} = require('../models/models')
const ApiError = require('../error/apiError');

class TypeController  {
    //создание категории
    async create  (req, res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    //возврат всех категорий
    async getALL   (req, res){
        const types = await Type.findAll()
        return res.json(types)
    }
    //изменение категорий
    async update(reg, res) {
        const {id} = req.params
        const {name} = req.body
        const type = await Type.findByPk(id)
        if (!type) {
            return res.status(404).json({ message: 'Категория не найдена' })
        }
        type.name = name
        await type.save()
        return res.json(type)
    }
    //удаление категорий
    async delete   (req, res){
        const{id} = req.params
        const result = await Type.destroy({where: {id}})
        if (result === 1){
            return res.json({message: "Deleted successfully!"})
        }
        return res.status(404).json({message: "Type not found or could not be deleted"})
    }    
}

module.exports = new TypeController()