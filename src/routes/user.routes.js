import { Router } from "express";
import { registerUser } from "../controllers/session.controller.js";


const routerUser = Router()
// /user
routerUser.post("/signup", registerUser) //anda

export default routerUser