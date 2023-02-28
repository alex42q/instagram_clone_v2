import axios, {AxiosResponse } from "axios";

const URL:string = "http://localhost:5000/api/v1"

export const RegisterUser = async (user:{}) =>{
    return await axios.post(`${URL}/register`, user);
}

export const LoginUser = async(user:{}) =>{
    return await axios.post(`${URL}/login`, user, {
        withCredentials:true
    });
}

export const GetUserDetails = async () =>{
    return await axios.get(`${URL}/user`, {
        withCredentials:true
    })
}

export const AddNewPost = async (post:{}) =>{
    return await axios.post(`${URL}/addnewpost`, post, {
        withCredentials:true
    })
}

export const GetOneUserFromUserName = async (slug:any) =>{
    return await axios.get(`${URL}/user/${slug}`, {
        withCredentials:true
    })
}

export const FollowOrUnfollowUser = async(slug:any) =>{
    return await axios.get(`${URL}/follow/${slug}`, {
        withCredentials:true
    })
}