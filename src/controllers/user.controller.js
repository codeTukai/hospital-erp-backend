import { ApiResponse } from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import { asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.models.js'
import {uploadCloudinary} from '../utils/cloudinary.js'


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
   
const existedUser = await User.findOne({
    $or:[{
        userName
    },{
        email
    }]
})

})

if (existedUser) {
    throw new ApiError(409, "user already exist")
}

const avatarFilePath = req.files?.avatar[0]?.path;

if (!avatarFilePath) {
    throw new ApiError(404, "Avatar required")
}

const avatar = await uploadCloudinary(avatarFilePath)

if (!avatar) {
    throw new ApiError(404, "Avatar required")
}

const user = await User.create(
    {
        fullName,
        avatar: avatar.url,
        email,
        password,
        username: username.toLowerCase,
        mobile,
        role
    }
)

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(400, "something went wrong while registering")
}

return res.status(201).json(
    
        new ApiResponse(200, createdUser, "user register successfully done")
    
)


export {userRegister}