const BaseError = require('./base');

class ValidationError extends BaseError {
    constructor(message) {
        super(message, 400);
    }
}

module.exports = ValidationError;
