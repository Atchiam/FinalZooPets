import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const cartSchema = new Schema({
    products:{
        type:[
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "products",
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default:[],
    total: {
        type:Number,
        required: true,
        default : 0
    }
    }
})

cartSchema.plugin(paginate)


const cartModel = model("Carts", cartSchema)

export default cartModel