import { User, UserType } from "../db/models/User";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs"
import { Op, Sequelize } from "sequelize" 
import jwt from "jsonwebtoken";
const decode = require("jwt-decode");
import { Follows } from "../db/models/Follows";
import { Posts } from "../db/models/Posts";
import { CreateNewPost } from "../types/core.types";
import { Follow } from "../db/models/Follows";

export const RegisterUser = async (req: Request, res: Response, next: NextFunction) =>{
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = <UserType> {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password: hashPassword,
        phone:req.body.phone,
        profile_photo:req.body.profile_photo
    };
    const newUser = await User.create(user);
    return res.status(201).json({
        data:newUser
    }) 
}

export const LoginUser = async (req:Request, res:Response, next: NextFunction) =>{ 
    const checkEmail = await User.findOne({
        where:{
            [Op.or] :[
                {email: req.body.email || null},
                {phone: req.body.email || null}
            ]
        }
    })
    if(checkEmail) {
        const checkPassword = await bcrypt.compare(req.body.password, checkEmail?.password || "");
        if(checkPassword){
            const token = jwt.sign({
                id:checkEmail.id,
                email:checkEmail.email,
            }, "ThisiSSecret", {expiresIn:"2h"})
            res.cookie("refresh_token", token, {maxAge: 7200000, httpOnly: true, })
            res.cookie("access_token", {active:true}, {maxAge: 120000, httpOnly: true})
            res.cookie("token", {active:true}, {maxAge: 7200000, httpOnly: false})
            return res.status(200).json({
                data:token
            })
        }else{
            return res.status(401).send("Wrong password")
        }
    }else{
        return res.status(404).send("No user found!")
    }
}

export const GetUser = async (req: Request, res:Response, next:NextFunction) =>{
    try {
        const refresh_token = decode(req.cookies['refresh_token'])
        const user = await User.findOne({
            where:{
                id: refresh_token.id
            }
        })
        const following = await Follows.findAll({
            where:{
                followingFromId: refresh_token.id
            },
            include:['follows', 'followers']
        })
        const followers = await Follows.findAll({
            where:{
                followingToId: refresh_token.id
            },
            include:['follows', 'followers']
        })

        const posts = await Posts.findAll({
            include:[
                {
                model:Follows,
                as:"postFollows",
                where:{
                    followingFromId:refresh_token.id
                },
                required:true,
                on: Sequelize.literal(`"Posts"."userId" = "postFollows"."followingToId"`),
     
            },
            {
                model:User,
                as:"posts"
            }
        ],
        })

        const userPosts = await Posts.findAll({
            where:{
                userId:refresh_token.id
            }
        })

        return res.status(200).json({
            data:user,
            following:following,
            followers:followers,
            followerPosts:posts,
            myPosts: userPosts,
        })
    }
    catch(err) {
        return res.status(404).json({
            data:err
        })
    }
}

export const PostCreateNewPostItem = async (req:Request, res:Response, next: NextFunction) =>{
    try{
        const refresh_token = decode(req.cookies['refresh_token'])

        const post = <CreateNewPost> {
            image:req.body.image,
            description:req.body.description,
            userId:refresh_token.id,
            likes:0
        }

        const newPost = await Posts.create(post);
        return res.status(201).json({
            data:newPost
        })
    }
    catch(err) {
        return res.status(404).send("Eror!")
    }
}

export const GetOneUser = async(req:Request, res:Response, next:NextFunction) =>{
    try{
        const refresh_token = decode(req.cookies['refresh_token'])
        const slug = req.params.slug

        const getUser = await User.findOne({
            where:{
                username: slug
            }
        })

        const following = await Follows.findAll({
            where:{
                followingFromId: getUser?.id
            },
            include:['follows', 'followers']
        })
        const followers = await Follows.findAll({
            where:{
                followingToId: getUser?.id
            },
            include:['follows', 'followers']
        })



        const userPosts = await Posts.findAll({
            where:{
                userId: getUser?.id
            }
        })
        return res.status(200).json({
            data:getUser,
            following:following,
            followers:followers,
            myPosts: userPosts,
        })
    }
    catch(err) {
        return res.status(404).send(err)
    }
}

export const FollowOrUnFollowUser = async(req: Request, res: Response, next: NextFunction) =>{
    const refresh_token = decode(req.cookies['refresh_token'])
    const slug = req.params.slug

    const getUser = await User.findOne({
        where:{
            username: slug
        }
    })

    const followType:Follow = {
        followingFromId:refresh_token.id,
        followingToId: getUser?.id
    }
    const chechIfAlreadyFollow = await Follows.findOne({
        where: Sequelize.and(
            {followingFromId:refresh_token.id},
            {followingToId: getUser?.id}
        )
    })
    if (chechIfAlreadyFollow === null) {
        const createFollow = await Follows.create(followType);
        return res.status(201).json({
            data:createFollow
        })
    }else{
        const unFollow = await Follows.destroy({
            where:{
                id:chechIfAlreadyFollow.id
            }
        })
        return res.status(201).json({
            data: `Unfollow user ${unFollow}`
        })
    }
    
}