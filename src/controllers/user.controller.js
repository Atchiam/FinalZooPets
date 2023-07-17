import { findUsers, findUsersAll, deleteUser} from "../services/userService.js";
export const getUsers = async (req, res, next) => {
    try {
        const users = await findUsers()
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}
export const deleteUsersByTime = async (req, res, next) => {
    try {
        const users = await findUsersAll();
        const currentTime = Date.now();
        const usersToDelete = [];
        const usersMails = [];

        for (const user of users) {
            const lastConnection = user.last_connection.getTime();
            const timeDifference = currentTime - lastConnection;
            const minutesDifference = Math.floor(timeDifference / (1000 * 60));

            if (minutesDifference >= 5 && user.role !== "admin") {
                usersToDelete.push(user._id);
                usersMails.push(user.email)
            }
        }

        await deleteUser(usersToDelete, usersMails);

        res.status(200).send(`Se eliminaron ${usersToDelete.length} usuarios inactivos.`);
    } catch (error) {
        next(error);
    }
};



