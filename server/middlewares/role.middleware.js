export default function AuthorizeRole(...roles){
    return (req,res,next)=>{
        if(!roles.contains(req.user.role)){
            return res.status(401).json({
                message: `${req.user.role} does not have access`
            })
        }
        next();
    }
}