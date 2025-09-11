import bcrypt from 'bcryptjs';
import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import Register from "../models/RegistrationModel.js";
dotenv.config();

const loginRouter = express.Router();
const jwt_secret = process.env.JWTKEY;

loginRouter.post('/register', async (req, res) => {
    const { userName, email, password,phoneNumber } = req.body;
    const ExistingUser = await Register.findOne({ email });
    if (ExistingUser) return res.status(400).json({ message: 'User Already Register' });
    try {
        const newUser = new Register({
            userName, email, password,phoneNumber 
        });
        await newUser.save();
        res.status(200).json({ message: 'User Registration is Successfull' });
    } catch (error) {
        console.log('Error while Registring User', error);
    }
});
loginRouter.get('/register', async (req, res) => {
    try {
        const user = await Register.find();
        res.status(201).json(user)
    } catch (error) {
        console.log('Error while Fetching User', error);
        res.status(500).json({ message: 'Fetching User is Failed' });
    }

});
loginRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Register.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User Not Found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'The password is incorrect' });

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            jwt_secret,
            { expiresIn: '2h' }
        );
        res.status(200).json({
            message: 'Login Successful', token,
            user: {
                id: user._id,
                name: user.userName,
                email: user.email,
                phoneNumber :user.phoneNumber,
                
            }
        });
    } catch (error) {
        console.log('Error while login', error);
        res.status(500).json({ message: 'Login is Failed' });

    }
});
loginRouter.get('/login', async (req, res) => {
    try {
        const user = await Register.find({});
        res.status(200).json({ user })

    } catch (e) {
        res.status(500).json({ message: "Error fetching User" }, e);
    }
});
loginRouter.post('/:id/address', async (req, res) => {
    try {
        const user = await Register.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User Not Found' });
        user.addresses.push(req.body);
        await user.save();
        res.status(200).json(user.addresses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching User Address", error: error.message });
    }
});
loginRouter.get('/:id/address',async(req,res)=>{
    try {
        const userAddress=await Register.findById(req.params.id);
        res.status(200).json( userAddress.addresses );
    } catch (error) {
        res.status(500).json({ message: "Error fetching User Address" }, error);
    }
})
loginRouter.post('/forget-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Register.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User Not Found' });

        const generateOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresOtpAt = new Date(Date.now() + 5 * 60 * 1000);

        user.otp = generateOtp;
        user.otpExpires = expiresOtpAt;
        await user.save();

        const transpoter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rssvinaykumar3801@gmail.com',
                pass: process.env.PASS_KEY
            }
        });
        await transpoter.sendMail({
            to: user.email,
            subject: 'Reset password OTP',
            html: `<h1>Your OTP For Resetting Your Password is:${generateOtp}</h1>`
        });

        res.status(200).json({ message: 'OTP sent successfully' });

    } catch (error) {
        console.log("Getting Error while Sending Email:", error);
        res.status(500).json({ message: 'Error sending an OTP' });
    }
});
loginRouter.post('/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await Register.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User Not Found' });
        if (user.otp !== otp || new Date() > user.otpExpires) {
            return res.status(400).json({ message: 'Invalid or OTP Expires' });
        }
        user.password = newPassword;
        user.otp = null;
        user.otpExpires = null;
        await user.save();
        res.json({ message: "Password reset successful" });
    } catch (error) {
        console.log('Error While Resetting Password', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
})



export default loginRouter;