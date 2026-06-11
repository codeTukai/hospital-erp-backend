class ApiError extends Error{
     constructor(
        statusCode, 
        message = "Something Went Wrong",
        errors = [],
        stack
    ){
        super(message)  //ReferenceError: Must call super constructor in derived class before accessing 'this'
        this.statusCode = statusCode,
        this.data = data,
        this.message = message,
        this.success = false,
        this.errors = errors
        if (stack) {
            this.stack = stack
        }else{
    Error.captureStackTrace(this, this.constructor)
        }
    }

}

export {ApiError}