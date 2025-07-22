const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index');
const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY, RECEPIENT_EMAIL } = require('../config/serverConfig');

const bookingService = new BookingService();

class BookingController {

    async sendMessageToQueue (req, res) {
        const channel = await createChannel();
        const payload = {
            data: {
                subject: 'This is a notification from message broker',
                content: 'Some queue is going to subscribe this.', 
                recepientEmail: RECEPIENT_EMAIL,
                notificationTime: '2025-07-22T21:14:00'
            },
            service: 'CREATE_TICKET'
        };
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload      ));
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