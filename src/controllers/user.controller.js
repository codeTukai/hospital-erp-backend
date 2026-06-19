import { ApiResponse } from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import { asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.models.js'


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

// console.log("email", email);

if(
    [email, fullName, userName, password].some((fields)=> fields?.trim() === "")
){
    throw new ApiError(400, "all fields are required")
}
   
User.findOne({
    $or:[{},{}]
})

})


export {userRegister}