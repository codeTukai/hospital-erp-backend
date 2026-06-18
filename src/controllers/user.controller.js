import { ApiResponse } from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import { asyncHandler} from '../utils/asyncHandler.js'


const userRegister = asyncHandler(async( req, res ) => {

//todos
//get user details from frontend / Postman
//check the validation---
//check existence -- if user already log in or not(username / email)
//upload image , upload avatar 
//if images coming from 
//created object id 
//entry to db 
// check for user creation 
//return response

const {email, password, userName, fullName} = req.body; // data coming from db via form and json -- url -- req.param

console.log("email", email);




res.status(200).json({
    message: "ok"
})
})


export {userRegister}