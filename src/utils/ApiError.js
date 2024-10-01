
class ApiError extends Error {
    constructor(
        statuscode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message); // Call the Error constructor
        this.statuscode = statuscode;
        this.data = null; // You can set this to an appropriate value if needed
        this.message = message; // Set the message
        this.success = false; // Set success to false
        this.errors = errors; // Set any specific errors

        if (stack) {
            this.stack = stack; // Fix typo: should be 'stack' not 'statck'
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };


