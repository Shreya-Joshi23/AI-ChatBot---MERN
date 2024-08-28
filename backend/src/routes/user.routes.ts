import {Router} from "express"
import { getAllUsers, userLogin, userSignUp, userlogout, verifyUser } from "../controllers/user.controllers.js";
import {validate,signupValidator, loginValidator} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes=Router();

userRoutes.get("/",getAllUsers)
userRoutes.post("/signup",validate(signupValidator),userSignUp)
userRoutes.post("/login",validate(loginValidator),userLogin);
userRoutes.get("/auth-status",verifyToken,verifyUser);
userRoutes.get("/logout",userlogout)
export default userRoutes;

