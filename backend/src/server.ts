import express ,{Application} from "express";
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser";
const app:Application = express();
const db = require("./db/service/db");
const PORT = 5000;

app.use(cors({
    methods:"GET, POST, PUT, PATCH, DELETE",
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

import UserRouter from "./routers/UserRoutes";

app.use(UserRouter);

app.listen(PORT, (err:void | Error) =>{
    if(err) {
        console.log(err)
    }else{
        console.log(`Backend server is up on port ${PORT}`)
    }
})