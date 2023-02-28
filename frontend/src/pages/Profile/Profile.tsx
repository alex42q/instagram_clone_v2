import React, {useState} from 'react'
import Nav from '../../components/Nav/Nav'
import { useAuth } from '../../context/AuthContext'
import AddNewPostModal from '../../components/AddNewPostModal/AddNewPostModal'
import OpenImageModal from '../../components/OpenImageModal/OpenImageModal'

interface ProfileUser {
    image:string
}

function Profile() {
    const [imageIndex, setImageIndex] = useState()
    const authCtx = useAuth()

  return (
    <div>
        <div className='indexPage__container'>
            <div>
                <Nav profile_photo={authCtx.userDetails.profile_photo}/>
            </div>
            <div>
                <div className='flex items-center profile__topCon'>
                    <div>
                        <img className='profile__profileImg' src={authCtx.userDetails.profile_photo} />
                    </div>
                    <div>
                        <div className='flex items-center ml-10 mb-5'>
                            <h5 className='font-bold mr-10'>{authCtx.userDetails.username}</h5>
                            <button className='profile__button_settings mr-10'>Επεξεργασία προφίλ</button>
                            <i className="fa fa-gear mr-10"></i>
                            <i onClick={authCtx.openModalFunction} className="fa fa-plus"></i>
                        </div>
                        <div className='flex items-center ml-10'>
                            <span className='mr-5'><span className='font-bold'>{authCtx.userMyPosts.length}</span> δημοσιεύσεις</span>
                            <span className='mr-5'><span className='font-bold'>{authCtx.userFollowers.length} </span>ακόλουθοι</span>
                            <span className='mr-5'>Ακολουθείτε <span className='font-bold'>{authCtx.userFollowing.length}</span> χρήστες</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='profile__gallery_con'>
            {authCtx.userMyPosts.map((items:ProfileUser, index:any) =>{
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
            image={authCtx.userMyPosts[authCtx.indexOfImage].image}
            description={authCtx.userMyPosts[authCtx.indexOfImage].description}
            profile_photo={authCtx.userDetails.profile_photo}
            email={authCtx.userDetails.email}
         /></> : <></>}
    </div>
  )
}

export default Profile