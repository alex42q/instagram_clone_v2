import React from 'react'
import "./MainComponent.css"
import { useAuth } from '../../context/AuthContext'
import PostComponent from '../PostComponent/PostComponent';

interface Posts  {
    posts:{
        email:string,
        profile_photo:string,
        address:string,
        username:string
    },
    image:string,
    description:string
}

function MainComponent() {
    const authCtx = useAuth();

  return (
    <div>
        <div className='mt-5'>
        {authCtx.userWallPosts.map((items:Posts) =>{
            return(
                <div className='mb-10'>
                <PostComponent 
                    link={items.posts.username}
                    profile_photo={items.posts.profile_photo}
                    name={items.posts.email}
                    address={"Athina"}
                    image={items.image}
                    description={items.description}
                />
                </div>
            )
        }).reverse()}
        </div>

    </div>
  )
}

export default MainComponent