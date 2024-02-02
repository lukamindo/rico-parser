
const axios = require('axios');
const cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6715608703:AAEnnYKoFV9u1SjWcOiNFQPjgFqGSrlfGP0');


const url = 'https://www.rico.ge/ka';
const channelId = '-1002100882829';
const intervalTime = 60000;

const options = {
    timeZone: 'Asia/Tbilisi',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
};

let lastRate = 0;

const interval = setInterval(function () {
    axios.get(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            const currRate = Number($('#sell-usd').text().trim());

            if (lastRate == currRate) {
                return
            }

            lastRate = currRate

            const currentDate = new Date();
            const formattedTime = new Intl.DateTimeFormat('ka-GE', options).format(currentDate);
            const message = `${formattedTime} - 1$ ღირს ${currRate.toFixed(4)}`;

            bot.sendMessage(channelId, message)
                .catch(error => {
                    console.error('Error sending message:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching URL:', error);
        });
}, intervalTime);