
const axios = require('axios');
const cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6715608703:AAEnnYKoFV9u1SjWcOiNFQPjgFqGSrlfGP0');



const url = 'https://www.rico.ge/ka';
const channelId = '1114929509';
const intervalTime = 5000;

let lastRate = 0;

const interval = setInterval(function () {
    axios.get(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            // Now you can use jQuery-like syntax to select elements and extract information
            // For example, let's extract all the text content from paragraphs
            const currRate = Number($('#sell-usd').text().trim());

            if (lastRate == currRate) {
                return
            }

            lastRate = currRate

            const currentDate = new Date();

            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();


            const message = `${hours}:${minutes}:${seconds} - 1$ ღირს ${currRate}`;

            bot.sendMessage(channelId, message)
                .catch(error => {
                    console.error('Error sending message:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching URL:', error);
        });
}, intervalTime)