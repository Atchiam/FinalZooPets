import { Router } from "express";
import * as controller from "../controllers/cart.controller.js"
import { sessionCheck } from "../config/sessionCheck.js";

const routerCart = Router()

//--/cart

routerCart.get('/',sessionCheck("user"), controller.getCartId)                                    
routerCart.put('/',sessionCheck("user"),controller.putAllArrayCart)                              
routerCart.delete('/',sessionCheck("user"), controller.deleteAllProdCart)                       
routerCart.post('/product/:idProducto',sessionCheck("user"), controller.addProdToCart )        
routerCart.put('/product/:idProducto',sessionCheck("user"), controller.putQuantityCart)       
routerCart.delete('/product/:idProducto',sessionCheck("user"), controller.deleteOneProdCart) 
routerCart.post('/checkout',sessionCheck("user"), controller.checkout)                      


export default routerCart