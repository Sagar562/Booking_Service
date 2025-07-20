const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index');
const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');
const { json } = require('body-parser');

const bookingService = new BookingService();

class BookingController {

    async sendMessageToQueue (req, res) {
        const channel = await createChannel();
        const data = {
            message: 'Success',
            text: 'First message'
        }
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(StatusCodes.OK).json({
            message: 'Successfully published the message event'
        });
    }

    async create (req, res) {
    try {
        const booking = await bookingService.create(req.body);
        return res.status(StatusCodes.CREATED).json({
            message: 'Booking created successfully',
            success: true,
            data: booking,
            error: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            success: false,
            data: {},
            error: error.explanation
        });
    }
}

}

module.exports = BookingController;