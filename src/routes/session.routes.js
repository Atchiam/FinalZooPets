import { Router } from "express";
import {loginUser,destroySession,current} from "../controllers/session.controller.js";

const routerSession = Router()

//'/api/sessions'
routerSession.get('/login', loginUser)        //anda
routerSession.get("/logout", destroySession) //anda
routerSession.get("/current", current )     //anda

export default routerSession