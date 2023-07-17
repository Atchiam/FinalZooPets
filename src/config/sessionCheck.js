export const sessionCheck = (role) => {
    return (req, res, next) => {
        req.logger.info("aca llego Pá")
        if(!req.session.login){
            return res.status(400).send("no estas logiado")
        }
        if(req.session.user.role !== role){
            return res.status(400).send("no estas autorizado para entrar")
        }
        next()
    }
}