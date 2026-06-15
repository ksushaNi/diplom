const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

const sendOrderConfirmation = async (userEmail, orderId, totalPrice) => {
    const mailOptions = {
        from: `"Бархат" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Подтверждение заказа №${orderId}`,
        html: `
            <div style="font-family: Arial; background: #F5D0D0; padding: 20px;">
                <h2 style="color: #4A0011;">Спасибо за заказ!</h2>
                <p>Ваш заказ №${orderId} на сумму ${totalPrice} ₽ принят.</p>
                <p>Статус заказа: <strong>Новый</strong></p>
                <p>Спасибо, что выбрали "Бархат" ❤️</p>
            </div>
        `
    }
    
    await transporter.sendMail(mailOptions)
}

module.exports = { sendOrderConfirmation }