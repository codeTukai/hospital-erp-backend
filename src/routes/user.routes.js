import { Router } from "express";
import { forgotPassword, generateRefreshToken, loggedOutUser, userLogin, userRegister } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middlewares.js"
import {verifyJWT} from '../middlewares/auth.middlewares.js'

const userRouter = Router() 

userRouter.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),

    userRegister
)
userRouter.route("/login").post(userLogin)

//secure routes

userRouter.route("/logOut").post(verifyJWT, loggedOutUser)
userRouter.route("/refresh-token").post(generateRefreshToken)
userRouter.route("/forgot-password").post(verifyJWT, forgotPassword)

export default userRouter;