import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) =>{
    // const header = req.get('Authorization');
    const cook = req.cookies["refresh_token"]
    const access_token = req.cookies["access_token"]
    let decodedToken;

    if (!cook && !access_token) {
        const error:Error = new Error("Not authenticated!");
        res.status(401).send("Not authenticated!");
        throw error;
    }
    const token:string = req.cookies["refresh_token"] || "";
    try {
        decodedToken = jwt.verify(token, "ThisiSSecret")
    }
    catch(err) {
        res.send("Invalid Token").status(500);
        throw err;
    }

    if(!decodedToken) {
        const error:Error = new Error("Not authenticated! Jwt not exists!");
        throw error;
    }
    next();
}