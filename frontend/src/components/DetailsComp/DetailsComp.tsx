import React from 'react'
import "./DetailsComp.css"

interface ChildreProps {
    image:string,
    email:string,
    firstname:string,
    lastname:string
}

function DetailsComp(props:ChildreProps) {
  return (
    <div className='flex items-center'>
        <div>
            <img className='details__comp_img' src={props.image} />
        </div>
        <div className='ml-5'>
            <h5 className='font-bold'>{props.email}</h5>
            <span>{props.firstname} {props.lastname}</span>
        </div>
    </div>
  )
}

export default DetailsComp