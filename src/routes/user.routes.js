import { Router } from "express";
import { allUser, registerUser } from "../controllers/session.controller.js";
import { sessionCheck } from "../config/sessionCheck.js";
import { deleteUsersByTime } from "../controllers/user.controller.js";


const routerUser = Router()

// /user

routerUser.get('/', sessionCheck("admin"), allUser) 

routerUser.delete("/", sessionCheck("admin"), deleteUsersByTime)

routerUser.get('/signup', async (req, res) => { 
    const data = req.query.menssage;
    res.render("signup",{ menssage:data})
})
routerUser.post("/signup", registerUser) 

export default routerUser