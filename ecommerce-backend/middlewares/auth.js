import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwt_secret = process.env.JWTKEY;
console.log("JWT Secret (from .env):", jwt_secret);

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("authHeader:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: 'No token is provided' });
    }

    const token = authHeader.split(' ')[1];
    
     console.log("Received Token:", token); 
    

    try {
        const decode = jwt.verify(token, jwt_secret);
        if (!decode.userId) return res.status(401).json({ message: 'Invalid Token' });
        req.user = { userId: decode.userId };
        next();
    } catch (error) {
        console.error('JWT Error:', error.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default verifyToken;