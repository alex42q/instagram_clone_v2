import React, {useContext, createContext, useState, FC, useEffect} from "react";
import Cookies from 'js-cookie'
import { GetUserDetails } from "../services/Services";

interface childrenProps {
    children: JSX.Element;
}

export interface UserType {
    email:string,
    firstName:string,
    lastName:string,
    id:number,
    phone:string,
    profile_photo:string
}

export const AuthContext = createContext<UserType | any > ({
    token:"",
    userDetails:{},
    isAuthenticated: false,
    userWallPosts:[],
    userFollowers:[],
    userFollowing:[],
    userMyPosts:[],
    openNewPostModal:false,
    openModalFunction:() =>{},
    closeModalFuntion:() =>{},
    fcOpenImageModal:() =>{},
    fcCloseImageModal:() =>{},
    openNewModalImage:false,
    indexOfImage:""
})

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}:childrenProps) =>{
    const [theToken, setTheToken] = useState(JSON.stringify(Cookies.get("access_token")) || "")
    const [UserDetails, getUserDetails] = useState({})
    const [UserWallPosts, getUserWallPosts] = useState([])
    const [isAuthBool, setIsAuthBool] = useState(false)
    const [UserFollowers, getUserFollowers] = useState([])
    const [UserFollowing, getUserFollowing] = useState([])
    const [UserMyPosts, getUserMyPosts] = useState([])
    const [openNewPostModal, setOpenNewPostModal] = useState(false)
    const [openImageModal, setOpenImageModal] = useState(false)
    const [getIndexOfImage, setIndexOfImage] = useState()

    useEffect(() =>{
        console.log(isAuthBool)
        if (Cookies.get("token")) {
            GetUserDetails()
            .then(res=>{
                setIsAuthBool(true)
                console.log(res.data.data)
                getUserDetails(res.data.data)
                getUserWallPosts(res.data.followerPosts)
                getUserFollowers(res.data.followers)
                getUserFollowing(res.data.following)
                getUserMyPosts(res.data.myPosts)
            })
            .catch(err =>{
                console.log(err)
            })
        }
    }, [])

    const FCopenImageModal = (index:any) => (e:any) =>{
        e.preventDefault();
        setOpenImageModal(true)
        setIndexOfImage(index)
    }

    const FCcloseImageModal = (e:Event | any) =>{
        e.preventDefault();
        setOpenImageModal(false)
    }


    const openModal = (e:Event | any) =>{
        e.preventDefault();
        setOpenNewPostModal(true)
    }

    const closeModal = (e:Event) =>{
        e.preventDefault()
        setOpenNewPostModal(false)
    }



    const value = {
        token:theToken,
        userDetails:UserDetails,
        isAuthenticated:!!Cookies.get("token"),
        userWallPosts:UserWallPosts,
        userFollowers:UserFollowers,
        userFollowing:UserFollowing,
        userMyPosts:UserMyPosts,
        openNewPostModal:openNewPostModal,
        openModalFunction:openModal,
        closeModalFunction:closeModal,
        fcOpenImageModal:FCopenImageModal,
        fcCloseImageModal:FCcloseImageModal,
        openNewModalImage:openImageModal,
        indexOfImage:getIndexOfImage
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}