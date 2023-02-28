import { LoginUser } from "../../services/Services"
import React, {useState} from 'react'
import axios, {AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";


export function LoginHelper() {
    const [emailOrPhone, getEmailOrPhone] = useState("");
    const [thepassword, getPassowrd] = useState("")
    const navigation = useNavigate()
    const loaderCtx = useLoader()
    const [setLoader, getSetLoader] = useState(false)

     function LoginFormHeler (e?:any){
        e.preventDefault();
        getSetLoader(true)
        console.log(loaderCtx.loader)
        const user = {
            email: emailOrPhone,
            password: thepassword
        }
        LoginUser(user)
        .then((res:AxiosResponse)=>{
            setTimeout(() =>{
                getSetLoader(false)
            window.location.reload()
            },1500)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return {LoginFormHeler, getEmailOrPhone, getPassowrd, setLoader}

}

