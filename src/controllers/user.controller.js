import { findUsers, findUserById, findUserByEmail, createUser} from "../services/UserService.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await findUsers()
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}

