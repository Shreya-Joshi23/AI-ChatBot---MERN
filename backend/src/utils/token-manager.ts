import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
  const token = req.signedCookies[`${COOKIE_NAME}`];
  console.log(token);
  //GOT THE TOKEN NOW VERIFY IT
  if(!token || token.trim()===""){
    return res.status(401).json({message:"Token not received"});
  }
  return new Promise<void>((resolve,reject)=>{
    return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
        if(err){
            reject(err.messasge);
            return res.status(401).json({message:"Token expired"})
        }else{
            console.log("Token verification successfull");
            resolve();
            res.locals.jwtData=success;
            return next();
        }
    });
  })}catch(error){
    console.log(error.message);
  }
};
