import userModel from "../models/MongoDB/userModel.js"

export const findUsers = async () => {
    try {
        const users = await userModel.find()
        return users
    } catch (error) {
        throw new Error(error)
    }
}

export const findUserById = async (id) => {
    try {
        const user = await userModel.findById(id)
        return user
    } catch (error) {
        throw new Error(error)
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await userModel.findOne({ email: email })
        return user
    } catch (error) {
        throw new Error(error)
    }
}

export const createUser = async (user) => {
    try {
        const newUser = await userModel.create(user)
        return newUser
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteUser = async (id) => {
    try {
        const users = await userModel.findByIdAndDelete(id)
        return users
    } catch (error) {
        throw new Error(error)
    }
}

export const updateUser = async (id, info) => {
    try {
        const users = await userModel.findByIdAndUpdate(id, info)
        return users
    } catch (error) {
        throw new Error(error)
    }
}

