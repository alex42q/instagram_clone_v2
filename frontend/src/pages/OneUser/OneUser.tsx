import React, {useEffect, useState} from 'react'
import { GetOneUserFromUserName } from '../../services/Services'
import Nav from '../../components/Nav/Nav'
import { useAuth } from '../../context/AuthContext'
import AddNewPostModal from '../../components/AddNewPostModal/AddNewPostModal'
import OpenImageModal from '../../components/OpenImageModal/OpenImageModal'
import { useParams } from 'react-router-dom';
import { CheckIfFollow } from '../../utils/CheckIfFollow'
import { Navigate } from 'react-router-dom'
import { OneUserUtilsFun } from "./OneUserUtils"
import { useLoader } from '../../context/LoaderContext'

interface ProfileUser {
    image:string
}

interface oneUserProfile {
    profile_photo?:string,
    email?:string,
    username?:string
}

interface oneUserMyPosts {
    image:string,
    description:string,
    profile_photo:string,
    email:string
}

function OneUser() {
    const [getUserOneDetails, setUserOneDetais] =  useState<oneUserProfile>({})
    const [oneUserPosts, getOneUserPosts] = useState<oneUserMyPosts[]>([])
    const [oneUserFollows, getOneUserFollows] = useState([])
    const [oneUserFollwers, getOneUserFollwers] = useState([])
    const [checkFollow, getsetCheckFollow] = useState(false);
    const authCtx = useAuth()
    const {followOrUnfollowF} = OneUserUtilsFun()
    const loaderCtx = useLoader()


    const { slug } = useParams<any>();

    useEffect(() =>{
        loaderCtx.loader = true
        GetOneUserFromUserName(slug)
        .then(res=>{
            setTimeout(() =>{
                setUserOneDetais(res.data.data)
                getOneUserFollows(res.data.following)
                getOneUserFollwers(res.data.followers)
                getOneUserPosts(res.data.myPosts)
                loaderCtx.loader = false
            }, 1500)

            
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])

    const onSubmitFollow = () =>{
        return followOrUnfollowF(getUserOneDetails.username)
    }

  return (
    <div>
        {loaderCtx.loader === true ? <>
            <div className="load">
    <div className="load-one"></div>
    <div className="load-two"></div>
    <div className="load-three"></div>
  </div>
        </> : <>
        {authCtx.userDetails.username === slug ?  <Navigate to='/profile' />: <>
            <div className='indexPage__container'>
            <div>
                <Nav profile_photo={authCtx.userDetails.profile_photo}/>
            </div>
            <div>
                <div className='flex items-center profile__topCon'>
                    <div>
                        <img className='profile__profileImg' src={getUserOneDetails.profile_photo} />
                    </div>
                    <div>
                        <div className='flex items-center ml-10 mb-5'>
                            <h5 className='font-bold mr-10'>{getUserOneDetails.username}</h5>
                            {CheckIfFollow(oneUserFollwers, authCtx.userDetails.id) === true ? <>
                                <button onClick={onSubmitFollow}className='profile__button_settings mr-10 '>Following</button>
                            </> : <>
                            <button onClick={onSubmitFollow}className='profile__button_settings mr-10 FollowingButton'>Follow</button>
                            </>}
                            
                            <i className="fa fa-gear mr-10"></i>
                            <i onClick={authCtx.openModalFunction} className="fa fa-plus"></i>
                        </div>
                        <div className='flex items-center ml-10'>
                            <span className='mr-5'><span className='font-bold'>{oneUserPosts.length}</span> δημοσιεύσεις</span>
                            <span className='mr-5'><span className='font-bold'>{oneUserFollwers.length} </span>ακόλουθοι</span>
                            <span className='mr-5'>Ακολουθείτε <span className='font-bold'>{oneUserFollows.length}</span> χρήστες</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='profile__gallery_con'>
            {oneUserPosts.map((items:ProfileUser, index:any) =>{
                return(<>
                    <a onClick={authCtx.fcOpenImageModal(index)} className='mr-3 ml-3 mb-5 cursor-pointer'>
                        <img className='profile__gallery' src={items.image} />
                    </a>
                 
                </>)
            }).reverse()}
        </div>
        {authCtx.openNewPostModal === true ? <><AddNewPostModal 
       
        /></> : <></>}
         {authCtx.openNewModalImage === true ? <><OpenImageModal
            image={oneUserPosts[authCtx.indexOfImage].image}
            description={oneUserPosts[authCtx.indexOfImage].description}
            profile_photo={getUserOneDetails.profile_photo}
            email={getUserOneDetails.email}
         /></> : <></>}
            </>}
        </>}
            

    </div>
  )
}

export default OneUser