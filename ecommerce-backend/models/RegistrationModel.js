import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';



const AddressSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: "India" },
    isDefault: { type: Boolean, default: false }
});

const RegisterSchema = mongoose.Schema({
    userName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    addresses: [AddressSchema],
    otp: String,
    otpExpires: Date
});



RegisterSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

const Register = mongoose.model('SignUp', RegisterSchema);

export default Register;
