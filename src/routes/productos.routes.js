import { Router } from "express";
import { getProd, getProdId,addProd,delProd,putProd } from "../controllers/products.controller.js";

// /products
const routerProduct = Router()
routerProduct.get('/', getProd)           //anda
routerProduct.get('/:id', getProdId)     //anda
routerProduct.post('/', addProd)        //anda
routerProduct.delete('/:id', delProd)  //anda
routerProduct.put('/:id', putProd)    //anda

export default routerProduct