import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
    try {
        let token = req.cookies?.token;
        if (token) {
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET); 
            const resp = await User.findById(decodeToken.userId).select(
                "isAdmin email"
            ); 
            req.user = {
                email: resp.email,
                isAdmin: resp.isAdmin,
                userId: decodeToken.userId,
            };
            next();

        } else {
            return res.status(401).json({status : false, message : "not authorized. Try Again."});
        }

    } catch (error) {
        console.log(error);
        return res
            .status(401)
            .json({ status : false, message:"Not Authorized. Try login again."});
    }
};

const isAdminRoute = (req, res, next) =>{
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({
            status: false, 
            message: "Not authorized as admin, try login as admin.",
        });
    }
};

export { isAdminRoute, protectRoute};
