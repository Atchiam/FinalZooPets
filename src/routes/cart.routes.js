import { Router } from "express";
import * as controller from "../controllers/cart.controller.js"
import { sessionCheck } from "../config/sessionCheck.js";

const routerCart = Router()

//--/cart

routerCart.get('/',sessionCheck("user"), controller.getCartId)                                    //anda
routerCart.put('/',sessionCheck("user"),controller.putAllArrayCart)                              //anda
routerCart.delete('/',sessionCheck("user"), controller.deleteAllProdCart)                       //anda
routerCart.post('/product/:idProducto',sessionCheck("user"), controller.addProdToCart )        //anda
routerCart.put('/product/:idProducto',sessionCheck("user"), controller.putQuantityCart)       //anda
routerCart.delete('/product/:idProducto',sessionCheck("user"), controller.deleteOneProdCart) //anda
routerCart.get('/checkout',sessionCheck("user"), controller.checkout)


export default routerCart