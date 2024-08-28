import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //getalluser from db
  try {
    //GET ALL USERS
    const users = await User.find();
    return res.status(200).json({ mesage: "OK", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user signup
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");
    const hashedpassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedpassword });
    await user.save(); //id is in object format

    //token is generated during sign up so that user don't have to login
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      signed: true,
    });
    //create token and store cookie
    const token = createToken(user._id.toString(), user.email, "7d");
    //cookie-parser is used to send the cookie from backend to the frontend
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(201)
      .json({ mesage: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user login
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send("Incorrect password");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    //cookie-parser is used to send the cookie from backend to the frontend
    console.log(token);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or token malfunctioned");
    }
    console.log(user._id.toString(), res.locals.jwtData.id);
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message:  error.message });
  }
};

export const userlogout=async (
  req: Request,
  res: Response,
  next: NextFunction)=>{
  try{
      //user token check
      // const user = await User.findById(res.locals.jwtData.id);
      // if (!user) {
      //   return res.status(401).send("User not registered OR Token malfunctioned");
      // }
      // if (user._id.toString() !== res.locals.jwtData.id) {
      //   return res.status(401).send("Permissions didn't match");
      // }
      res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });
      return res.status(200).json({ message: "OK" });
    }catch(error){
      console.log(error.message)
      res.status(500).json({ message: error.message });
  }
};
