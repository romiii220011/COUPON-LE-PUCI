const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/use-coupon', (req, res) => {
    const { couponId } = req.body;

    // Configura il trasporto email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'raminders714@gmail.com',
            pass: 'lepucitiamo'
        }
    });

    // Configura i dettagli dell'email
    const mailOptions = {
        from: 'raminders714@gmail.com',
        to: 'raminders714@gmail.com',
        subject: 'Coupon Usato',
        text: `Il coupon con ID: ${couponId} è stato usato.`
    });

    // Invia l'email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Errore nell\'invio dell\'email:', error);
            res.status(500).send('Errore nell\'invio dell\'email');
        } else {
            console.log('Email inviata:', info.response);
            res.status(200).send('Notifica inviata');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
