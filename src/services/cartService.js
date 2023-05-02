import cartModel from "../models/MongoDB/cartModel.js"; 

export const createCart = async () => {
    try{
        const newCart = await cartModel()
        newCart.save()
        return newCart
    }catch(error){
        throw new Error(error)
    }
}

export const deleteCart = async (id) => {
    try{
        return await cartModel.findByIdAndDelete(id)
    }catch(error){
        throw new Error(error)
    }
}

export const findCartById = async (id) => {
    try{
        return await cartModel.findById(id)
    }catch(error){
        throw new Error(error)
    }
}

export const updateCart = async (id,info) => {
    try{
        return await cartModel.findByIdAndUpdate(id,info)
    }catch(error){
        throw new Error(error)
    }
}

