import productosModel from "./productosModelFaker.js"

export const insertProductos = async (elements) => {
    try {
        const products = await productosModel.insertMany(elements)
        return products
    } catch (error) {
        throw new Error(error)
    }
}

export const findProductos = async () => {
    try {
        const products = await productosModel.find()
        return products
    } catch (error) {
        throw new Error(error)
    }
}

export const findProductosById = async (id) => {
    try {
        const products = await productosModel.findById(id)
        return products
    } catch (error) {
        throw new Error(error)
    }
}

export const updateOneProductos = async (id, info) => {
    try {
        const products = await productosModel.findByIdAndUpdate(id, info)
        return products
    } catch (error) {
        throw new Error(error)
    }
}


export const deleteOneProductos = async (id) => {
    try {
        const products = await productosModel.findByIdAndDelete(id)
        return products
    } catch (error) {
        throw new Error(error)
    }
}

export const paginateProductos = async (filter, options) => {
    try {
        const products = await productosModel.paginate(filter, options)
        return products
    } catch (error) {
        throw new Error(error)
    }
}