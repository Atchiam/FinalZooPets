import { Router } from "express";
import { messageio } from "../controllers/message.controller.js";

const routerMessage = Router()
routerMessage.get('/', async (req, res) => { 
    messageio(req)
    res.render("chat")
})

export default routerMessage