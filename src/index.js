import "./config/dotenv.js"
import express from 'express'
import { __filename, __dirname } from "./path.js"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import passport from 'passport';
import initializePassport from './config/passport.js';

import routerCart from './routes/cart.routes.js';
import routerProduct from './routes/productos.routes.js';
import routerSession from './routes/session.routes.js';
import routerUser from './routes/user.routes.js';
import routerGithub from './routes/github.routes.js';

//CORS



const app = express()
//midlewares
//express
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URLMONGODB,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,  //Me permita cerrar la pestaña o recargar y la sesion siga activa
    saveUninitialized: true  //Guardar sesion aunque no contenga info
}))

//passwort
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//MONGOOSE
const connectionMongoose = async () => {
    await mongoose.connect(process.env.URLMONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .catch((err) => console.log(err));
}

app.set("port", process.env.PORT || 8080)
const server = app.listen(app.get("port"), () =>{
    console.log(`Server on port ${app.get("port")}`);
})


connectionMongoose()


//Cookies

app.get('/setCookie', (req, res) => {
    res.cookie('CookieCookie', "Esta es mi primer cookie", { maxAge: 60000, signed: true })
    res.cookie('CookieCookie2', "si hay una puede aver 2", { maxAge: 60000, signed: true })
    res.send("van 2")
})      // referencia al nombre, referencia a la informacion enviada                             envia datos

app.get('/getCookie', (req, res) => {
    res.send(req.signedCookies)
})

//midlewares


//--------Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/products', express.static(__dirname + '/public')) 
app.use('/products', routerProduct) 
app.use('/cart',express.static(__dirname + '/public'))
app.use('/cart',routerCart)
app.use('/api/sessions', routerSession)
app.use('/user', routerUser)
app.use('/authSession', routerGithub)
