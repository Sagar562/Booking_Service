const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index');

const bookingService = new BookingService();

const create = async (req, res) => {
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

module.exports = {
    create
}