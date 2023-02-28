import React, {useEffect, useState} from "react"
import { AddNewPost } from "../../services/Services";

export const AddNewPostModalHelper = () =>{
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("")

    const submitAddNewPost = (e:React.FormEvent) =>{
        e.preventDefault();

        const post = {
            image:image,
            description:description
        }

        AddNewPost(post)
        .then(res=>{
            window.location.reload()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return {setImage, setDescription, submitAddNewPost}
}