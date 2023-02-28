import React from 'react'
import "./OpenImageModal.css"
import { useAuth } from '../../context/AuthContext'

type ImageModalType = {
    image?:string,
    description?:string,
    email?:string,
    profile_photo?:string
}

function OpenImageModal(props:ImageModalType) {
    const authCtx = useAuth();

  return (
    <div className='imageModal__con'>
        <div>
        <i onClick={authCtx.fcCloseImageModal} className='fas fa-times mr-12 mt-5 cursor-pointer text-3xl text-white absolute right-0' />
        </div>
        <div className='flex justify-center imageModal__inside'>
            <div className='imageModal__conLeft'>
                <img className='imageModal__img' src={props.image} />
            </div>
            <div className='imageModal__contRight relative'>
                <div className='flex items-center pt-3 pb-3 pl-3 pr-3'>
                    <img className='imageModal__profilePhoto' src={props.profile_photo} />
                    <h5 className='ml-4'>{props.email}</h5>
                </div>
                <hr className='mt-3 mb-3'></hr>
                <div className='flex items-center pl-3 pr-3'>
                    <img className='imageModal__profilePhoto' src={props.profile_photo} />
                    <h5 className='mr-2 ml-2 font-bold'>{props.email}</h5>
                    <h5 className=''>{props.description}</h5>
                </div>
                <div className='imageModal__bottomCon'>   
                    <div className='flex items-center pl-3 pr-3'>
                        <i className="fas fa-heart mr-2"></i>
                        <i className="fas fa-paper-plane mr-2"></i>
                        <i className="fas fa-comment mr-2"></i>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                        <input className='imageModalComment_input' type="text" placeholder='Add a comment' />
                        <button className='imageModal__button_Input' type='submit'>Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OpenImageModal