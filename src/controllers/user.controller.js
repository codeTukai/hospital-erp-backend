import { ApiResponse } from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import { asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.models.js'
import {uploadCloudinary} from '../utils/cloudinary.js'

const generateAccessTokenAndRefreshToken = async (userId) => {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken =  user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})

    return { accessToken, refreshToken }
}
const options = {
    httpOnly : true,
    secure: true
}

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

const {email, password, username, fullName, mobile, role} = req.body; // data coming from db via form and json -- url -- req.param

// console.log("email", email);
// console.log("password", password);
// console.log("username", username);
// console.log("fullName", fullName);
// console.log("mobile number", mobile);
// console.log("role", role);

// console.log(req.body);





if(
    [email, password, username, fullName, mobile, role].some((fields)=> fields?.trim() === "")
){
    throw new ApiError(400, "all fields are required")
}
   
const existedUser = await User.findOne({
    $or:[{
        username
    },{
        email
    }]
})

if (existedUser) {
    throw new ApiError(409, "user with email or username already exists")
}

const avatarFilePath = req.files?.avatar[0]?.path;
console.log(req.files);

// console.log(avatarFilePath);


if (!avatarFilePath) {
    throw new ApiError(404, "Avatar file is required")
}

const avatar = await uploadCloudinary(avatarFilePath)

console.log(avatar);


if (!avatar) {
    throw new ApiError(404, "Avatar required")
}

const user = await User.create(
    {
        fullName,
        avatar: avatar.url,
        email,
        password,
        username: username.toLowerCase(),
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

})


const userLogin = asyncHandler(async(req,res) => {

    const {username, email, password } = req.body

    if(!username || !email){
        throw new ApiError(500, "email or username is required")
    }

    // const user = await User.findOne({email})  // only email based login 

    const user = await User.findOne({  // username or email based login $or is the mongodb method
        $or : [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "user doesn't exists")
    }

    const passwordValid = await user.isPasswordCorrect(password)

    if (!passwordValid) {
        throw new ApiError(401, "UnAuthorized user")
    }

    //if password valid then create access token and refresh token
    

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

    const loggedInUser = await User.findOne(user._id).select("-password -refreshToken")

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200,
        {
            loggedInUser, accessToken, refreshToken
        },
        "User Logged In Successfully")
    )
    

})


const loggedOutUser = asyncHandler(async (req, res) => {
    
})

export {
    userRegister,
    userLogin
}