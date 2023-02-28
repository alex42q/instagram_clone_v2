import { Request, Response, NextFunction } from "express";

export const isRerfreshedToken = (req: Request, res: Response, next: NextFunction) =>{
    const refresh_token = req.cookies["refresh_token"];
    const access_token = req.cookies["access_token"];
    if (refresh_token && !access_token) {
        res.cookie("access_token", {active:true}, {maxAge: 120000, httpOnly: true})
    }
    return next()
}