import { jwt } from "jsonwebtoken"

export default function VerifyToken(req,res,next){
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
    }

    if(!token){
        return res.status(400).json({
            message: "Token is not valid"
        })
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decode;
        console.log("Decoded user is : ",req.user);
        next();
    } catch (error) {
        res.status(500).json({
            message: "Error while getting token"
        })
    }

}