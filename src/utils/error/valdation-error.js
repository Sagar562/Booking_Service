const { StatusCodes } = require("http-status-codes");

class ValidationError extends Error {
    constructor(error) {
        
        super();

        let explanation = [];
        error.errors.foreach((err) => {
            explanation.push(err.message);
        });

        this.name = 'Validation Error';
        this.message = 'Not able to validate request data';
        this.explanation = explanation;
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = ValidationError;