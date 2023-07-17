import local from "passport-local"
import passport from "passport"
import { createHash, comparePassword } from "../utils/bcrypt.js"
import GitHubStrategy from 'passport-github2'
import { createCart } from "../services/cartService.js"
import { createUser, findUserByEmail, findUserById } from "../services/userService.js"


const LocalStrategy = local.Strategy


const initializePassport = () =>{

    passport.use("signup", new LocalStrategy(
        {passReqToCallback: true, usernameField: "email"}, async (req,username, password,done)=>{
            //validar y crear user
            const { first_name, last_name, email, age} = req.body
            try {
                const userlogin = await findUserByEmail(username)  //Consultar users en mi BDD
                if (userlogin ) { 
                return done(null, false) //null = errores false no se creo el user
                } else {
                    const newCart = await createCart()
                    console.log(newCart);
                    const hashPassword = createHash(password)
                    console.log(hashPassword)
                    const userCreated= await createUser({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        age: age,
                        password: hashPassword,
                        cartId:newCart._id
                    })
                    console.log(userCreated)
                    return done(null, userCreated)
                }
                
            } catch (error) {
                return done (error.message)
            }
        }
    ))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

        try {
            const user = await findUserByEmail(username)
            if (!user) { //Usuario no encontrado
                return done(null, false)
            }
            if (comparePassword(password, user.password)) { //Usuario y contraseña validos
                return done(null, user)
            }
            return done(null, false) //Contraseña no valida
        } catch (error) {
            return done(error)
        }
    }))


    passport.use("github", new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:8080/authSession/githubSession"
    },async(accessToken, refreshToken, profile, done)=>{
        try{
            const user = await findUserByEmail(profile._json.email)
    
            if(user){ //user ya existe en BD
                done(null, user)
            }else{
                const newCart = await createCart()
                const passwordHash = createHash('coder123')
                const userCreated= await createUser({
                    first_name: profile._json.name,
                    last_name: "  ",
                    email: profile._json.email,
                    age: 18,
                    password: passwordHash,
                    cartId:newCart[0]._id
                })
                done(null, userCreated)
            }
        }catch(error){
            return(error)
        }
    }))



    //Iniciar la session del usuario
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //Eliminar la sesion del usuario
    passport.deserializeUser(async (id, done) => {
        const user = await findUserById(id)
        done(null, user)
    })
} 

export default initializePassport