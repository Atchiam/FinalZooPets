import { Router } from "express";

const routerloggerTest = Router()
routerloggerTest.get('/', async (req, res) => { 
    req.logger.fatal('ERROR en la base de datos es mejor correr y no mirar atras')
    req.logger.error('ERROR en alguna parte, seria eso que no ves, alguna categoria por ejemplo, quien sabe')
    req.logger.warning('Warning,  Cuidado con...ahi viene corre!!.. AHHHhhh!!...')
    req.logger.debug('OKEY, todo funciona aparentemente bien... o no?...')
    res.send("Holiwis")
})

export default routerloggerTest