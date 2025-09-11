import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Register",
        required: true
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId, ref: "Product",
                required: true
            }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    status:{
        type:String,
        enum:["Pending","Shipped","Delivered","Cancelled"],
        default:"Pending",
    },
    isCancelled:{type:Boolean, default:false},
    cancelledAt:{type:Date},
    cancelReason:{type:String},
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

export default Order;