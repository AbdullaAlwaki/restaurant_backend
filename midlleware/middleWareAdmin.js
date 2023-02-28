import User from "../models/user.models.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";

export const middleWareAdmin = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // if(req.cookies.access_token){
    //     token=req.cookies.access_token
    // }

    if (!token) {
      return res
        .status(401)
        .json({ message: "you need to login" });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "you need to signUp" });
    }
console.log(user);
    if (user.role !== "admin") {
      return res
        .status(404)
        .json({ message: "You are not authorized to access this route" });
    }

    req.user = user;
    next()
  } catch (error) {
    next(error);
  }
};

export const auth = async (req, res, next) => {
    try {
        let token;
        if ( req.cookies.access_token ) {
            token = req.cookies.access_token
        }
        if (!token) {
            return res.status(401).json({ message: "you need to login" });
        }
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "you need to signUp" });
        }
        req.user = user;
        next()
    } catch (error) {
        next(error);
    }
}

export const isAdmin = async(res,req, next)=>{
  const token = res.params.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "you need to login" });
  }

  
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
  const user = await User.findById(decoded.id);
  
  if (!user) {
    return res
      .status(401)
      .json({ message: "you need to signUp" });
  }
  
  if(user.role !== "admin"){  
    res.status(404).json({message:"You are not authorized to access this route"})
  } else {
    next();
  }

}