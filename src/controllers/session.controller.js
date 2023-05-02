// const admin = {
//     first_name: "Braian",
//     last_name: "Ferreyra",
//     email: "adminCoder@coder.com",
//     age: 26,
//     password: "admincod3r123",
// }
import passport from "passport";
export const registerUser = async (req, res, next) => {
    try {
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
        res.status(500).send(error.message);
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
            res.status(200).send(`Hola ${user.first_name}, tu roll es ${user.role} `);
        })(req, res, next);

    } catch (error) {
        res.status(500).send("necesitas estar logiado para irte");
    }
};

export const destroySession = async (req, res) => {
    try {
        if (req.session.login) {
            req.session.destroy();
            res.status(200).send("hasta luego, recorda que siqueres ver nuestra pagina necesitas logiarte");
        } else {
            res.status(400).send("necesitas estar logiado para irte");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const current = async (req, res) => {
    try {
        if (req.session.login) {
            res.status(200).json({ response: req.session.user });
        } else {
            res.status(400).send("no estas logiado papa");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};
