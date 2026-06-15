const {Rating} = require('../models/models')
const ApiError = require('../error/apiError');

class RatingController {
    // Функция создания рейтинга
    async create(req, res, next) {
        try {
            const {userId, productId, rate} = req.body;
            // Валидация входных данных
            if (!userId || !productId || rate === undefined) {
                return next(ApiError.badRequest('Не указаны все необходимые параметры'));
            }
            // Проверка, что оценка в допустимом диапазоне (например, от 1 до 5)
            if (rate < 1 || rate > 5) {
                return next(ApiError.badRequest('Оценка должна быть от 1 до 5'));
            }
            // Проверка, не оценивал ли пользователь товар ранее
            const existingRating = await Rating.findOne({
                where: {userId, productId}
            });
            if (existingRating) {
                return next(ApiError.badRequest('Вы уже оценивали этот товар'));
            }
            const rating = await Rating.create({userId, productId, rate});
            return res.json(rating);
        } catch (e) {
            return next(ApiError.internal('Ошибка при создании рейтинга'));
        }
    }
    // Функция получения всех рейтингов
    async getAll(req, res, next) {
        try {
            const ratings = await Rating.findAll();
            return res.json(ratings);
        } catch (e) {
            return next(ApiError.internal('Ошибка при получении рейтингов'));
        }
    }
}

module.exports = new RatingController();