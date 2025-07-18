const axios = require('axios');

const { BookingRepository } = require('../repository/index');
const { ServiceError } = require('../utils/error');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async create(data) {
        try {
            const flightId = data.flightId;
            const getFlightUrl =`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const flight = await axios.get(getFlightUrl);
            const flightData = flight.data.data;

            if (data.noOfseats > flightData.totalSeats) {
                throw new ServiceError();
            }
            
            const totalCost = data.noOfSeats * flightData.price;
            const bookingPayload = ({...data, totalCost});
            const booking = await this.bookingRepository.create(bookingPayload);
            
            const updateFlightUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            const updateFlight = await axios.patch(updateFlightUrl, { totalSeats: flightData.totalSeats - booking.noOfSeats });

            const finalBooking = await this.bookingRepository.update(booking.id, {status: 'Booked'});
            return finalBooking;

        } catch (error) {
            throw new ServiceError();
        }
    }
}

module.exports = BookingService; 