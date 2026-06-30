import { Router } from "express";
import {
     changeCurrentPassword, 
     generateRefreshToken, 
     getCurrentUser,
     loggedOutUser,
     updateAvatar,
     updatedUserProfile,
     userLogin,
     userRegister }
      from "../controllers/user.controller.js";
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
userRouter.route("/change-password").post(verifyJWT, changeCurrentPassword)
userRouter.route("/get-user").get(verifyJWT, getCurrentUser)
userRouter.route("/update-profile").put(verifyJWT, updatedUserProfile)
userRouter.route("/update-avatar").put(verifyJWT,upload.single("avatar"), updateAvatar)

export default userRouter;