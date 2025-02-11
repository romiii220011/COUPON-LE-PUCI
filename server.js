const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server funzionante!');
});

app.post('/use-coupon', (req, res) => {
    const { couponId } = req.body;

    // Configura Telegram
    const botToken = '7953413659:AAHQl6jd0xg76jPd95ODfPeavFUl0fXjJMc';
    const chatId = '1248191242';
    const message = `Il coupon con ID: ${couponId} è stato usato.`;

    // Invia il messaggio Telegram
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Messaggio inviato:', data);
        res.status(200).send('Notifica inviata');
    })
    .catch(error => {
        console.error('Errore nell\'invio del messaggio:', error);
        res.status(500).send('Errore nell\'invio del messaggio');
    });
});

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
