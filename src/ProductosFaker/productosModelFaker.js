import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2'

const productosSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:Array,
        default:["img/default.jpg"],
    },
    code:{
        type:String,
        required:true,
        unique:true,
    },
    status:{
        type:Boolean,
        default:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
})

productosSchema.plugin(paginate)

const productosModel = model("100Products", productosSchema)

export default productosModel