// const admin = {
//     first_name: "Braian",
//     last_name: "Ferreyra",
//     email: "adminCoder@coder.com",
//     age: 26,
//     password: "admincod3r123",
// }
import passport from "passport";
import CustomError from "../utils/customError.js";
import EErrors from "../utils/enums.js";
import { generateUserErrorInfo } from "../utils/info.js";
import { findUsers, updateUser } from "../services/userService.js";
export const registerUser = async (req, res, next) => {
    try {
        const {first_name,last_name,email,age,password}= req.body
        if(!first_name||!last_name||!email||!age||!password){
            CustomError.createError({
                name:"User creation error",
                cause: generateUserErrorInfo({first_name,last_name,email,age,password}),
                message: "Error al crear el usuario faltan algunos de los campos",
                code: EErrors.REQUIRED_ERROR
            })
            
        }
        passport.authenticate("signup", async (err, user) => {
            if (err) {
                return res.status(400).send({error: err});
            }
            if (!user) {
                return res.status(400).send("e-mail ya esta en uso");
            }
            res.status(200).send("te registraste correctamente podes logiarte papa");
        })(req, res, next);
    } catch (error) {
        next(error)
    }
};

export const loginUser = async (req, res, next) => {
    try {
        passport.authenticate("login", async (err, user) => {
            if (err) {
                return res.status(400).send("error en el login");
            }
            if (!user) {
                return res.status(400).send("e-mail o passwort incorrecto");
            }
            req.session.login = true
            req.session.user = user
            await updateUser(user._id, { last_connection: Date.now() })
            res.status(200).send(`Hola ${user.first_name}, tu roll es ${user.role} `);
        })(req, res, next);

    } catch (error) {
        next(error);
    }
};

export const destroySession = async (req, res, next) => {
    try {
        if (req.session.login) {
            const userId = req.session.user._id
            req.session.destroy();
            await updateUser(userId, { last_connection: Date.now() })
            res.status(200).send("hasta luego, recorda que siqueres ver nuestra pagina necesitas logiarte");
        } else {
            res.status(400).send("necesitas estar logiado para irte");
        }
    } catch (error) {
        next(error);
    }
};

export const current = async (req, res, next) => {
    try {
        if (req.session.login) {
            res.status(200).json({ response: req.session.user });
        } else {
            res.status(400).send("no estas logiado papa");
        }
    } catch (error) {
        next(error);
    }
};

export const allUser = async (req, res, next) => {
    try {
        const users = await findUsers();
        res.status(200).json(users); 
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los usuarios" }); 
        }
}
