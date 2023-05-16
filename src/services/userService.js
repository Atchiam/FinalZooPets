import userModel from "../models/MongoDB/userModel.js"
import CustomError from "../utils/customError.js";
import EErrors from "../utils/enums.js";

export const findUsers = async () => {
    try {
        const users = await userModel.find()
        return users
    } catch (error) {
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al encontrar a los usuarios",
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const findUserById = async (id) => {
    try {
        const user = await userModel.findById(id)
        return user
    } catch (error) {
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al encontrar al user",
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await userModel.findOne({ email: email })
        return user
    } catch (error) {
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al encontrar el usuario por el e-mail",
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const createUser = async (user) => {
    try {
        const newUser = await userModel.create(user)
        return newUser
    } catch (error) {
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al crear el usuario",
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const deleteUser = async (id) => {
    try {
        const users = await userModel.findByIdAndDelete(id)
        return users
    } catch (error) {
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al eliminar el usuario",
            code: EErrors.DATABASE_ERROR
        })
    }
}

export const updateUser = async (id, info) => {
    try {
        const users = await userModel.findByIdAndUpdate(id, info)
        return users
    } catch (error) {
        CustomError.createError({
            name:"Nombre generico de Error de DB",
            cause: error.message,
            message: "Error al updatear el usuario",
            code: EErrors.DATABASE_ERROR
        })
    }
}

