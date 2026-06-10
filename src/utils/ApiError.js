class ApiError extends Error{
    constructor(
        statusCode, 
        message = "Something Went Wrong",
        errors = [],
        stack
    ){
        super(message)
        this.statusCode = statusCode,
        this.data = this.data,
        this.message = message,
        this.success = false,
        this.errors = errors
        if (stack) return this.stack = stack
    
       Error.captureStackTrace(this, this.constructor)
        
    }

}

export {ApiError}