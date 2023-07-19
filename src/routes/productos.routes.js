import { Router } from "express";
import { getProd, getProdId,addProd,delProd,putProd } from "../controllers/products.controller.js";
import { sessionCheck } from "../config/sessionCheck.js";
// /products
const routerProduct = Router()
routerProduct.get('/', getProd)                                 
routerProduct.get('/:id', getProdId)                           
routerProduct.post('/',sessionCheck("admin"), addProd)        
routerProduct.delete('/:id',sessionCheck("admin"), delProd)  
routerProduct.put('/:id',sessionCheck("admin"), putProd)    

export default routerProduct