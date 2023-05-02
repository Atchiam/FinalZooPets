import { Router } from "express";
import * as controller from "../controllers/cart.controller.js"

const routerCart = Router()

//--/cart

routerCart.get('/', controller.getCartId)                                        //anda
routerCart.put('/',controller.putAllArrayCart)                                  //anda
routerCart.delete('/', controller.deleteAllProdCart)                           //anda
routerCart.post('/product/:idProducto', controller.addProdToCart );           //anda
routerCart.put('/product/:idProducto', controller.putQuantityCart)           //anda
routerCart.delete('/product/:idProducto', controller.deleteOneProdCart)     //anda

export default routerCart