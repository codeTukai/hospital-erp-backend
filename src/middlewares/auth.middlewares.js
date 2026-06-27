import { User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from 'jsonwebtoken';

export default verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization", "Bearer ", "")
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request")  
    
          }
    
     const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
     const user = await User.findById(decodedUser?._id).select("-password -refreshToken")
    
     if(!user){
        throw new ApiError(401, "invalid Access token")
    
     }
    
     this.user = user
     next()
    } catch (error) {
        throw new ApiError(401, error.message || "invalid Access token")
    }
    
})