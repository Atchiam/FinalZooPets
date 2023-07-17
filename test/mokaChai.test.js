import chai from "chai";
import supertest from "supertest";
import { deleteUser } from "../src/services/userService.js";
import mongoose from "mongoose";

await mongoose.connect("mongodb+srv://Atchiam:Atchiamcoderhouse@cluster0.gbxrbnr.mongodb.net/?retryWrites=true&w=majority")
const expect = chai.expect
const requester = supertest("http://localhost:8080")

describe("Test User",() => {
    let galletita = ""
    let id = ""
//------------------------------------------------------------------

    it("Crear User", async function () {
        const user = {
            first_name: "Armando",
            last_name: "Aredes",
            email: "moka@mocha.com",
            age: "45",
            password: "gato"
        }
        
        const res = await requester.post("/user/signup").send(user)

        expect(res.statusCode).to.equal(200)
        console.log("Se creo el usuario correctamente");
    })

//------------------------------------------------------------------

    it("Login User", async function () {
        const user = {
            email: "moka@mocha.com",
            password: "gato"
        }

        const res = await requester.post("/api/sessions/login/").send(user)

        const cookieInRes = res.headers["set-cookie"][0]
        expect(cookieInRes).to.be.ok
        galletita = {name:cookieInRes.split("=")[0],value:cookieInRes.split("=")[1]}
        expect(res.statusCode).to.equal(200)
        console.log(res.headers);

        console.log("Se logeo correctamente");
    })

//------------------------------------------------------------------

    it("Probando rol de user", async function () {
        const res = await requester.get("/cart/").set("Cookie", [`${galletita.name}=${galletita.value}`])
        expect(res.statusCode).to.equal(200)
        console.log(res._body);
        console.log(`se encontro el carrito: ${JSON.stringify(res._body.carritopopulated)}`)
        const res2 = await requester.delete("/user/").set("Cookie", [`${galletita.name}=${galletita.value}`])
        expect(res2.statusCode).to.equal(400)
        console.log(`toca de aca pá, que no sos admin`)
    })
    
//------------------------------------------------------------------

    it("current User", async function () {
        const res = await requester.get("/api/sessions/current").set("Cookie", [`${galletita.name}=${galletita.value}`])
        expect(res.statusCode).to.equal(200)
        console.log(res._body);
        id = res._body.response._id.toString()
        console.log(id);
    })

//------------------------------------------------------------------
    it("Logout User", async function () {
        const res = await requester.get("/api/sessions/logout").set("Cookie", [`${galletita.name}=${galletita.value}`])
        expect(res.statusCode).to.equal(200)
        console.log(res._body);
        await deleteUser(id)
    })
})