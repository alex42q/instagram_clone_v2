import React from 'react'
import NavIcon from '../NavIcon/NavIcon'
import "./Nav.css"

type ProfilePhone = {
    profile_photo:string
}

function Nav(profile_photo:ProfilePhone) {
  return (
    <div className='nav__container'>
        <div className='mb-12'>
            <h1 className='nav__h1'>Instagram</h1>
        </div>
        <div>
            <NavIcon link='/' name='Home' icon='fas fa-home' />
            <NavIcon name='Search' icon='fas fa-search' />
            <NavIcon name='Discover' icon='fas fa-print' />
            <NavIcon name='Reels' icon='fas fa-retweet' />
            <NavIcon name='Messages' icon='fas fa-paper-plane' />
            <NavIcon name='Notifications' icon='fas fa-heart' />
            <NavIcon name='Δημιουργία' icon='fas fa-plus' />
            <a href='/profile' className='flex items-center'>
                <img className='nav__profilePhoto' src={profile_photo.profile_photo}></img>
                <h5 className='nav__profile_h5 ml-2'>Profile</h5>
            </a>
        </div>
    </div>
  )
}

export default Nav