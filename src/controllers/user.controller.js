import { findUsers, findUserById, findUserByEmail, createUser} from "../services/UserService.js";

export const getUsers = async (req, res) => {
    try {
        const users = await findUsers()
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
