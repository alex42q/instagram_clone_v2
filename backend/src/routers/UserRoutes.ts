import { Router, Express } from "express";
const router = Router();

import { RegisterUser, LoginUser, GetUser, PostCreateNewPostItem, GetOneUser, FollowOrUnFollowUser } from "../controllers/UserController";

import { isAuth } from "../middlewares/isAuth";
import { isRerfreshedToken } from "../middlewares/refreshAccessToken";

router.post("/api/v1/register", RegisterUser);
router.post("/api/v1/login", LoginUser);
router.get("/api/v1/user", isRerfreshedToken, isAuth, GetUser)
router.post("/api/v1/addnewpost", isRerfreshedToken, isAuth, PostCreateNewPostItem)
router.get("/api/v1/user/:slug", isRerfreshedToken, isAuth, GetOneUser)
router.get('/api/v1/follow/:slug', isRerfreshedToken, isAuth, FollowOrUnFollowUser)

export default router