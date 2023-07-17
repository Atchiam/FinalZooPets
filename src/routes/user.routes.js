import { Router } from "express";
import { allUser, registerUser } from "../controllers/session.controller.js";
import { sessionCheck } from "../config/sessionCheck.js";
import { deleteUsersByTime } from "../controllers/user.controller.js";


const routerUser = Router()

// /user

routerUser.get('/', sessionCheck("admin"), allUser) //anda re piola re cañon

routerUser.delete("/", sessionCheck("admin"), deleteUsersByTime)

//post eso mandarles un e-mail a los giles.

routerUser.get('/signup', async (req, res) => { 
    const data = req.query.menssage;
    res.render("signup",{ menssage:data})
})
routerUser.post("/signup", registerUser) //anda

export default routerUser