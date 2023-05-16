import productModel from "../models/MongoDB/productModel.js";
import CustomError from "../utils/customError.js";
import EErrors from "../utils/enums.js";

export const insertProducts = async (elements) => {
    try {
        const products = await productModel.insertMany(elements)
        return products
    } catch (error) {
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al crear el Productos",
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const findProducts = async () => {
    try {
        const products = await productModel.find()
        return products
    } catch (error) {
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al encontrar el Productos",
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const findProductsById = async (id) => {
    try {
        const products = await productModel.findById(id)
        return products
    } catch (error) {
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al encontrar el Producto espesifico",
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const updateOneProducts = async (id, info) => {
    try {
        const products = await productModel.findByIdAndUpdate(id, info)
        return products
    } catch (error) {
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al updatear el Productos",
            code: EErrors.DATABASE_ERROR
        })
    }
}


export const deleteOneProducts = async (id) => {
    try {
        const products = await productModel.findByIdAndDelete(id)
        return products
    } catch (error) {
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al eliminar el Productos",
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const paginateProducts = async (filter, options) => {
    try {
        const products = await productModel.paginate(filter, options)
        return products
    } catch (error) {
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al paginar Productos",
            code: EErrors.DATABASE_ERROR
        })
    }
}