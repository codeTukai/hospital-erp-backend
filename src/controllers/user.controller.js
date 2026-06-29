import { ApiResponse } from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import { asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.models.js'
import {uploadCloudinary} from '../utils/cloudinary.js'

const generateAccessTokenAndRefreshToken = async (userId) =>{
try {
      const user = await User.findById(userId)
      const accessToken = await user.generateAccessToken()
      const refreshToken = await user.generateRefreshToken()

      console.log(accessToken);
      

      user.refreshToken = refreshToken

      await user.save({ validateBeforeSave: false })

      return { accessToken, refreshToken }

} catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token")
}
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


const userLogin = asyncHandler( async (req, res) => {
    // existence of user ==> if exist then next step with login --> otherwise sign up / register
    //userId, userPassword ==> if match --> generate-- accessToken, refreshToken
    //otherwise forgot password
    //last step cookies

    const {email, username, password} = req.body

    if((!email && !username)){
        throw new ApiError(400, "email or username is required")
    }

    const user = await User.findOne({
         $or: [
            {email},
            {username}
        ]
         
        })

    if(!user){

        throw new ApiError(404, "user not found")
    }

    const checkValidPassword = await user.isPasswordCorrect(password)

    console.log(checkValidPassword)

    if(!checkValidPassword){
        throw new ApiError(401, "Invalid user credentials")
    }

    // const accessToken = user.generateAccessToken()
    // const refreshToken = user.generateRefreshToken()
   
   const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)
   console.log(accessToken);
   

   const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  
console.log(res);

return res.status(200)
   .cookie("accessToken", accessToken, options)
   .cookie("refreshToken", refreshToken, options)
   .json(
    new ApiResponse(200,{
        user: loggedInUser, accessToken, refreshToken //optional
    },
    "User logged in successfully"

     )
   )
})



const loggedOutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 //this removes the field from document
            }
            
        },
        {
           new: true
        }
    )

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
         new ApiResponse(200, {}, "User logged out")
    )
})

export {
    userRegister,
    userLogin,
    loggedOutUser
}