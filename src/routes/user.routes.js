import { Router } from "express";
import { userRegister } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middlewares.js"

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
// userRouter.route("/login").post(userRegister)

export default userRouter;