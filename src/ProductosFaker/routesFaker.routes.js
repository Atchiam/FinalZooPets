import { Router } from "express";
import { AgregarProdFaker,getProductos,getProductosId,delProductos,putProductos, prodFaker } from "./productosFaker.controller.js";

const routerFaker = Router()
//----- /faker
routerFaker.post('/', AgregarProdFaker)                                
routerFaker.get('/', getProductos)   
routerFaker.get('/mockingproducts', prodFaker)   

routerFaker.get('/:id', getProductosId)                          
routerFaker.delete('/:id', delProductos) 
routerFaker.put('/:id', putProductos)    


export default routerFaker