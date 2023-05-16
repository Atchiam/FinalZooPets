import messageModel from "../models/MongoDB/messageModel.js"
import CustomError from "../utils/customError.js";
import EErrors from "../utils/enums.js";

export const insertMessage = async (elements) => {
    try {
        const message = await messageModel.insertMany(elements)
        return message
    } catch (error) {
        CustomError.createError({
                name:"Nombre generico de Error de DB",
                cause: error.message,
                message: "Error al crear el menssage",
                code: EErrors.DATABASE_ERROR
            })
    }
}

export const findMessage = async () => {
    try {
        const message = await messageModel.find()
        return message
    } catch (error) {
        CustomError.createError({
                name:"Nombre generico de Error de DB",
                cause: error.message,
                message: "Error al encontrar el mensaje",
                code: EErrors.DATABASE_ERROR
            })
    }
}

export const findMessageById = async (id) => {
    try {
        const message = await messageModel.findById(id)
        return message
    } catch (error) {
        CustomError.createError({
                name:"Nombre generico de Error de DB",
                cause: error.message,
                message: "Error al encontrar el mensaje espesifico",
                code: EErrors.DATABASE_ERROR
            })
    }
}
