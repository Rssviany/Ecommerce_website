import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import loginRouter from './routers/SignInandUp.js'
import productRouters from './routers/ProductsList.js'
import orderRouter from './routers/OrdersList.js'
import addressRouter from './routers/AddressRouter.js'
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://ecommerce-website-z69m.vercel.app", // your Vercel frontend URL from screenshot
    credentials: true
}));

app.use('/api/ecommerce_clone', loginRouter);
app.use('/api/ecommerce_clone/products', productRouters);
app.use('/api/ecommerce_clone/orders', orderRouter);
app.use('/api/ecommerce_clone/address', addressRouter);

app.get('/', (req, res) => {
    res.send('Hello')
});
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGOURL)
    .then(() => {
        console.log("Mongoose connected Successfully");
        app.listen(port, (req, res) => {
            console.log(`Server is running at ${port}`)
        })
    })
    .catch((e) => {
        console.log(e);
    })