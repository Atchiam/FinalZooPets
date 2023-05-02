import productModel from "../models/MongoDB/productModel.js";

export const insertProducts = async (elements) => {
    try {
        const products = await productModel.insertMany(elements)
        return products
    } catch (error) {
        throw new Error(error)
    }
}

export const findProducts = async () => {
    try {
        const products = await productModel.find()
        return products
    } catch (error) {
        throw new Error(error)
    }
}

export const findProductsById = async (id) => {
    try {
        const products = await productModel.findById(id)
        return products
    } catch (error) {
        throw new Error(error)
    }
}

export const updateOneProducts = async (id, info) => {
    try {
        const products = await productModel.findByIdAndUpdate(id, info)
        return products
    } catch (error) {
        throw new Error(error)
    }
}


export const deleteOneProducts = async (id) => {
    try {
        const products = await productModel.findByIdAndDelete(id)
        return products
    } catch (error) {
        throw new Error(error)
    }
}

export const paginateProducts = async (filter, options) => {
    try {
        const products = await productModel.paginate(filter, options)
        return products
    } catch (error) {
        throw new Error(error)
    }
}