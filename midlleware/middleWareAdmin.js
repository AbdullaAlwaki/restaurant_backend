import UserModel from "../models/user.models.js"



export const middleWareAdmin = async (req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token=req.headers.authorization.split(" ")[1]
        }

        if(req.cookies.access_token){
            token=req.cookies.access_token
        }

        if(!token){
            return res.status(401).json({message:"You are not authorized to access this route"})
        }

        const decoded= await promisify(jwt.verify)(token,process.env.SECRET);

        const user= await UserModel.findById(decoded.id);

        if(!user){
            return res.status(401).json({message:"You are not authorized to access this route"})
        }

        if(user.role!=="admin"){
            return res.status(401).json({message:"You are not authorized to access this route"})
        }

        

        req.user=user;

    } catch (error) {
        next(error)
    }
}