import {findCartById, updateCart} from "../services/cartService.js"
import { findProductsById } from "../services/productService.js"
import productModel from "../models/MongoDB/productModel.js"

export const addProdToCart = async (req, res) => {
    if (req.session.login){
        try{
            let idCarrito = req.session.user.cartId
            let idProducto = req.params.idProducto
            let prodEncontrado = await findProductsById(idProducto)
            if(prodEncontrado){
                const cart = await findCartById(idCarrito)
                const prodPo = cart.products.findIndex(product => product.productId.equals(idProducto))
                if(prodPo=== -1){
                    cart.products.push({productId: idProducto})
                }else{
                    cart.products[prodPo].quantity += 1
                }

                await cart.save()
                res.status(200).send(cart)

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
        try {
            const id= req.session.user.cartId
            const cart = await findCartById(id)
            const carritopopulated= await cart.populate({path: "products.productId", model: productModel})
            console.log(carritopopulated.products[1].quantity);
            res.status(200).json({carritopopulated})
        } catch (error) {
            res.status(400).send(error.message);
        }
    }else{
        res.status(400).send(error.message)
    }

}
export const putAllArrayCart = async (req, res) => { //ANDA
    if (req.session.login){
        try{
            const cartId= req.session.user.cartId
            const data= req.body
            const cart = await updateCart (cartId,data)
            res.status(200).send(cart)

        }catch(error){
            res.status(400).send(error.message)
        }
    }else{
        res.status(400).send(error.message)
    }
}

export const putQuantityCart = async (req, res) => {//anda
    if (req.session.login){
        try{
            let idCarrito = req.session.user.cartId
            let idProducto = req.params.idProducto
            const {quantity} = req.body;
            const quant= parseInt(quantity)

            const cart = await findCartById(idCarrito)
            const prodPo = cart.products.findIndex(product => product.productId.equals(idProducto))

            cart.products[prodPo].quantity = quant

            await cart.save()
            res.status(200).send("se agrego tu producto")

        }catch(error){
            res.status(400).send(error.message)
        }
    }else{
        res.status(400).send(error.message)
    }
}
export const deleteAllProdCart = async (req, res) => { //ANDA
    if (req.session.login){
        try{
            const idCarrito= req.session.user.cartId
            await updateCart(idCarrito,{products: []})
            res.status(200).send("se borraron todos los productos")   
        }catch(error){
            res.status(400).send(error.message)
        }
    }else{
        res.status(400).send(error.message)
    }
}

export const deleteOneProdCart = async (req, res) => { //ANDA
    if (req.session.login){
        try{
            let idCarrito= req.session.user.cartId
            let idProducto = req.params.idProducto
            const cart = await findCartById(idCarrito)
            const prodPo = cart.products.findIndex(product => product.productId.equals(idProducto))

            cart.products.splice(prodPo,1)
            await cart.save()
            res.status(200).send("se borro el producto de tu carrito")   

        }catch(error){
            res.status(400).send(error.message)
        }
        
    }else{
        res.status(400).send(error.message)
    }
}