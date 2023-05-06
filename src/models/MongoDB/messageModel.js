
import { Schema, model } from "mongoose";


const messageSchema = new Schema({
    user: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    message:{
        type: String,
        require:true
    }
})

const messageModel = model("Message", messageSchema)


export default messageModel