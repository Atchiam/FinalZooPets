import { Router } from "express";
import {loginUser,destroySession,current} from "../controllers/session.controller.js";

const routerSession = Router()

//'/api/sessions'
routerSession.get('/login', async (req, res) => { 
    const data = req.query.menssage;
    res.render("login",{ menssage:data})
})
routerSession.post('/login', loginUser)        
routerSession.get("/logout", destroySession) 
routerSession.get("/current", current )     


export default routerSession