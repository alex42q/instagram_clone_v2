import React from 'react'
import "./PostComponent.css"

interface Props {
    profile_photo:string,
    name:string,
    address:string,
    image:string,
    description:string,
    link:string
}

function PostComponent(props:Props) {
  return (
    <div className='post__container'>
        <a href={`/profile/${props.link}`} className='flex items-center pt-4 pb-4 pl-2'>
            <div className='mr-3'>
                <img className='post__profile_photo' src={props.profile_photo} />
            </div>
            <div>
                <h5>{props.name}</h5>
                <p>{props.address}</p>
            </div>
        </a>
        <div className='posts__image_con'>
            <img className='posts__image' src={props.image}></img>
        </div>
        <div className='flex items-center justify-between pt-3 pb-3 pr-2 pl-2'>
            <div>
            <i className="fas fa-heart mr-2"></i>
            <i className="fas fa-paper-plane mr-2"></i>
            <i className="fas fa-comment mr-2"></i>
            </div>
            <div>
            <i className="fas fa-bookmark"></i>
            </div>
        </div>
        <div className='flex items-center justify-between p-2'>
            <h5 className='font-bold'>{props.name}</h5>
            <p>{props.description}</p>
        </div>
    </div>
  )
}

export default PostComponent