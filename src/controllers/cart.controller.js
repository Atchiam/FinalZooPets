import {findCartById, updateCart} from "../services/cartService.js"
import { findProductsById } from "../services/productService.js"
import productModel from "../models/MongoDB/productModel.js"

export const addProdToCart = async (req, res) => {
    if (req.session.login){
        const idCarrito = req.session.user.cartId
        const idProducto = req.params.idProducto
        try{
            let prodEncontrado = await findProductsById(idProducto)
            if(prodEncontrado){
                const cart = await findCartById(idCarrito)
                const prodInd = cart.products.findIndex(product => product.productId.equals(idProducto))
                if(prodInd=== -1){
                    cart.products.push({productId: idProducto})
                }else{
                    cart.products[prodInd].quantity += 1
                }

                await updateCart(idCarrito, cart)
                return res.status(200).send(cart)

            }else{
                res.send("el producto no se encuentra")
            }

        }catch(error){
            res.status(400).send(error.message)
        }
    }else{
        res.status(400).send(error.message)
    }
}

export const getCartId = async (req, res) => { //ANDA
    if (req.session.login){
        const id= req.session.user.cartId
        try {
            const cart = await findCartById(id)
            const carritopopulated= await cart.populate({path: "products.productId", model: productModel})
            return res.status(200).json({carritopopulated})

        } catch (error) {
            res.status(400).send(error.message);
        }
    }else{
        res.status(400).send(error.message)
    }

}
export const putAllArrayCart = async (req, res) => { //ANDA
    if (req.session.login){
        const cartId= req.session.user.cartId
        const data= req.body
        try{
            await updateCart (cartId,{products: data})
            return res.status(200).send(cart)

        }catch(error){
            res.status(400).send(error.message)
        }
    }else{
        res.status(400).send(error.message)
    }
}

export const putQuantityCart = async (req, res) => {//anda
    if (req.session.login){

        const idCarrito = req.session.user.cartId
        const idProducto = req.params.idProducto
        const {quantity} = req.body;
        const quant= parseInt(quantity)

        try{
            const cart = await findCartById(idCarrito)
            const prodInd = cart.products.findIndex(product => product.productId.equals(idProducto))

            cart.products[prodInd].quantity = quant

            await updateCart(idCarrito, cart)
            return res.status(200).send("se agrego tu producto")

        }catch(error){
            res.status(400).send(error.message)
        }
    }else{
        res.status(400).send(error.message)
    }
}
export const deleteAllProdCart = async (req, res) => { //ANDA
    if (req.session.login){
        const idCarrito= req.session.user.cartId
        try{
            await updateCart(idCarrito,{products: []})
            return res.status(200).send("se borraron todos los productos")   
        }catch(error){
            res.status(400).send(error.message)
        }
    }else{
        res.status(400).send(error.message)
    }
}

export const deleteOneProdCart = async (req, res) => { //ANDA
    if (req.session.login){
        const idCarrito= req.session.user.cartId
        const idProducto = req.params.idProducto
        try{
            const cart = await findCartById(idCarrito)
            const prodInd = cart.products.findIndex(product => product.productId.equals(idProducto))

            cart.products.splice(prodInd,1)
            await updateCart(idCarrito, cart)
            return res.status(200).send("se borro el producto de tu carrito")   

        }catch(error){
            res.status(400).send(error.message)
        }
        
    }else{
        res.status(400).send(error.message)
    }
}