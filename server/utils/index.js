import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB connection established");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

export default dbConnection;


export const createJWT = (res, userId) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn : "1d"});
  res.cookie("token" , token, {httpOnly : true, 
    secure: process.env.NODE_ENV !== "production",
    sameSite : "strict", //prevent CSRF attack
    maxAge: 1 *24*60*60*1000, //1day
  })

}