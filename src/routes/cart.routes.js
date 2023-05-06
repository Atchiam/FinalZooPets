import { Router } from "express";
import * as controller from "../controllers/cart.controller.js"
import { sessionCheck } from "../config/sessionCheck.js";

const routerCart = Router()

//--/cart

routerCart.get('/',sessionCheck("Usuario"), controller.getCartId)                                    //anda
routerCart.put('/',sessionCheck("Usuario"),controller.putAllArrayCart)                              //anda
routerCart.delete('/',sessionCheck("Usuario"), controller.deleteAllProdCart)                       //anda
routerCart.post('/product/:idProducto',sessionCheck("Usuario"), controller.addProdToCart )        //anda
routerCart.put('/product/:idProducto',sessionCheck("Usuario"), controller.putQuantityCart)       //anda
routerCart.delete('/product/:idProducto',sessionCheck("Usuario"), controller.deleteOneProdCart) //anda
routerCart.get('/checkout',sessionCheck("Usuario"), controller.checkout)


export default routerCart