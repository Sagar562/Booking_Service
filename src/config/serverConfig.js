const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    FLIGHT_SERVICE_PATH: process.env.FLIGHT_SERVICE_PATH,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL, 
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    QUEUE_NAME: process.env.QUEUE_NAME,
    REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
    RECEPIENT_EMAIL: process.env.RECEPIENT_EMAIL
}