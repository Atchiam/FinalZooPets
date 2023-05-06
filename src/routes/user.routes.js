import { Router } from "express";
import { registerUser } from "../controllers/session.controller.js";


const routerUser = Router()
// /user
routerUser.get('/signup', async (req, res) => { 
    const data = req.query.menssage;
    res.render("signup",{ menssage:data})
})
routerUser.post("/signup", registerUser) //anda

export default routerUser