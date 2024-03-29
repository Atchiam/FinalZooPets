import "./config/dotenv.js"
import express from 'express'
import { __filename, __dirname } from "./path.js"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import passport from 'passport';
import initializePassport from './config/passport.js';
import { engine } from "express-handlebars";
import * as path from 'path'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'


import routerCart from './routes/cart.routes.js';
import routerProduct from './routes/productos.routes.js';
import routerSession from './routes/session.routes.js';
import routerUser from './routes/user.routes.js';
import routerGithub from './routes/github.routes.js';
import routerMessage from "./routes/chat.routes.js"
import routerFaker from "./ProductosFaker/routesFaker.routes.js"
import { errorHandler } from "./config/errorHandler.js"
import { addLogger } from "./utils/logger.js"
import routerloggerTest from "./routes/loggerTest.routes.js"
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

// Swagger

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "ZooPets",
            description: "Tienda de mascotas la mejor de todas ponele"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))


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
export const server = app.listen(app.get("port"), () =>{
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

app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set("view engine", 'handlebars');
app.set('views', path.resolve(__dirname, './views'))

app.use(addLogger)

//--------Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/products', express.static(__dirname + '/public')) 
app.use('/products', routerProduct) 
app.use('/cart',express.static(__dirname + '/public'))
app.use('/cart',routerCart)
app.use('/chat', express.static(__dirname + '/public')) 
app.use('/chat', routerMessage)
app.use('/api/sessions', routerSession)
app.use('/user', routerUser)
app.use('/authSession', routerGithub)
app.use ('/faker', routerFaker)
app.use("/loggerTest", routerloggerTest)

//----- Middleware

app.use(errorHandler)