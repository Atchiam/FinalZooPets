import { Router } from "express";
import { getProd, getProdId,addProd,delProd,putProd } from "../controllers/products.controller.js";
import { sessionCheck } from "../config/sessionCheck.js";
// /products
const routerProduct = Router()
routerProduct.get('/', getProd)                                 //anda
routerProduct.get('/:id', getProdId)                           //anda
routerProduct.post('/',sessionCheck("admin"), addProd)        //anda
routerProduct.delete('/:id',sessionCheck("admin"), delProd)  //anda
routerProduct.put('/:id',sessionCheck("admin"), putProd)    //anda

export default routerProduct