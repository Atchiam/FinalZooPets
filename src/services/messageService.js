import messageModel from "../models/MongoDB/messageModel.js"

export const insertMessage = async (elements) => {
    try {
        const message = await messageModel.insertMany(elements)
        return message
    } catch (error) {
        throw new Error(error)
    }
}

export const findMessage = async () => {
    try {
        const message = await messageModel.find()
        return message
    } catch (error) {
        throw new Error(error)
    }
}

export const findMessageById = async (id) => {
    try {
        const message = await messageModel.findById(id)
        return message
    } catch (error) {
        throw new Error(error)
    }
}
