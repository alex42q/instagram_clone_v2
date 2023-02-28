import React from 'react'
import "./NavIcon.css"

type Icon = {
    name:string,
    icon:string,
    link?:string
}

function NavIcon(icon:Icon) {
  return (
    <a href={icon.link} className='flex items-center navIconCon'>
        <i className={`${icon.icon} navIcon`}></i>
        <h3 className='nav__iconText ml-5 mr-5'>{icon.name}</h3>
    </a>
  )
}

export default NavIcon