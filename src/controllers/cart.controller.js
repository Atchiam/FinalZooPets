import {findCartById, updateCart} from "../services/cartService.js"
import { findProductsById } from "../services/productService.js"
import productModel from "../models/MongoDB/productModel.js"
import { createTicket } from "../services/ticketService.js"

export const addProdToCart = async (req, res, next) => {
    const idCart = req.session.user.cartId
    const idProduct = req.params.idProducto
    try {
        const realProduct = await findProductsById(idProduct);

        if (realProduct) {
            const cart = await findCartById(idCart);
            const productIndex = cart.products.findIndex(product => product.productId.equals(idProduct));
            if (productIndex === -1) {
                cart.products.push({ productId: idProduct });
            } else {
                cart.products[productIndex].quantity += 1;
            }
            await updateCart(idCart, cart);
            return res.status(200).send("Producto agregado al carrito")
        }

    } catch (error) {
        next(error)
    }
}

export const getCartId = async (req, res, next) => { //ANDA

        const id= req.session.user.cartId
        try {
            const cart = await findCartById(id)
            const carritopopulated= await cart.populate({path: "products.productId", model: productModel})
            return res.status(200).json({carritopopulated})

        } catch (error) {
            next(error);
        }


}
export const putAllArrayCart = async (req, res, next) => { //ANDA

        const cartId= req.session.user.cartId
        const data= req.body
        try{
            await updateCart (cartId,{products: data})
            return res.status(200).send(cart)

        }catch(error){
            next(error);
        }

}

export const putQuantityCart = async (req, res, next) => {//anda

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
            next(error);
        }
}
export const deleteAllProdCart = async (req, res, next) => { //ANDA

        const idCarrito= req.session.user.cartId
        try{
            await updateCart(idCarrito,{products: []})
            return res.status(200).send("se borraron todos los productos")   
        }catch(error){
            next(error);
        }
}

export const deleteOneProdCart = async (req, res, next) => { //ANDA
        const idCarrito= req.session.user.cartId
        const idProducto = req.params.idProducto
        try{
            const cart = await findCartById(idCarrito)
            const prodInd = cart.products.findIndex(product => product.productId.equals(idProducto))

            cart.products.splice(prodInd,1)
            await updateCart(idCarrito, cart)
            return res.status(200).send("se borro el producto de tu carrito")   

        }catch(error){
            next(error);
        }
        
}

export const checkout = async (req, res, next) => {
        const idCarrito= req.session.user.cartId
        const purchaser = req.session.user.email
        
        try{
            const cart = await findCartById(idCarrito)
            const carritopopulated= await cart.populate({path: "products.productId", model: productModel})

            const amount = cart.total

            for (const prodInCart of carritopopulated.products) {
                const product = prodInCart.productId;
                const cantidad  = prodInCart.quantity
                if(cantidad > product.stock){
                    const prodInd = cart.products.findIndex(product => product.productId.equals(product._id))
                    cart.products.splice(prodInd, 1)
                }
                
            }

            const cartUpdate = await updateCart(idCarrito, cart)

            if (cartUpdate.total !== amount){
                return res.status(400).send("no tenemos stock de alguno de tus productos")
            }

            const nuevoTicket = await createTicket({amount, purchaser})

            for (const prodInCart of cart.products){
                const product = await findProductsById(prodInCart.productId)
                const quantity = prodInCart.quantity
                product.stock -= quantity
                await product.save()
            }

            await updateCart(idCarrito, {products:[]})

            return res.status(200).send({ticket:nuevoTicket})

        }catch(error){
            next(error);
        }
}