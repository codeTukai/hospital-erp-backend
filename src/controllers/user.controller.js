import { ApiResponse } from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import { asyncHandler} from '../utils/asyncHandler.js'


const userRegister = asyncHandler(async( req, res )=>{

// const {email, password, userName} = res.body;

// console.log("email",email);


res.status(200).json({
    message: "ok"
})
})

export {userRegister}