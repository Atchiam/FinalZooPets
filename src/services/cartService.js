import cartModel from "../models/MongoDB/cartModel.js"; 
import productModel from "../models/MongoDB/productModel.js";
import CustomError from "../utils/customError.js";
import EErrors from "../utils/enums.js";

export const createCart = async () => {
    try{
        const newCart = await cartModel()
        newCart.save()
        return newCart
    }catch(error){
        CustomError.createError({
                name:"Nombre generico de Error de DB",
                cause: error.message,
                message: "Error al crear el carrito",
                code: EErrors.DATABASE_ERROR
            })
    }
}

export const deleteCart = async (id) => {
    try{
        return await cartModel.findByIdAndDelete(id)
    }catch(error){
        CustomError.createError({
                name:"Nombre generico de Error de DB",
                cause: error.message,
                message: "Error al eliminar el carrito",
                code: EErrors.DATABASE_ERROR
            })
    }
}

export const findCartById = async (id) => {
    try{
        return await cartModel.findById(id)
    }catch(error){
        CustomError.createError({
                name:"Nombre generico de Error de DB",
                cause: error.message,
                message: "Error al encontrar el carrito",
                code: EErrors.DATABASE_ERROR
            })
    }
}

export const updateCart = async (id, info) => {
    try {
        const cart = await cartModel.findByIdAndUpdate(id, info, { new: true });

        let total = 0;
        for (const productInCart of cart.products) {
            const product = await productModel.findById(productInCart.productId);
            total += product.price * productInCart.quantity;
        }
        cart.total = total;

        cart.save()

        return cart;

    } catch (error) {
        CustomError.createError({
                name:"Nombre generico de Error de DB",
                cause: error.message,
                message: "Error al updatear el carrito",
                code: EErrors.DATABASE_ERROR
            });
    }
}
