import { Schema, model } from "mongoose";

const userSchema = new Schema({  
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    age: {
        type: Number,
        default: 18,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: "carts",
        required: true
    },
    last_connection: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const userModel = model("Users", userSchema)

export default userModel