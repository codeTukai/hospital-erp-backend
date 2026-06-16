import { Router } from "express";
import { userRegister } from "../controllers/user.controller.js";

const router = Router() 

router.route("/register").post(userRegister)
router.route("/login").post(userRegister)

export default router;