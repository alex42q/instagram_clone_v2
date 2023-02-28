import React, {useEffect, useState} from 'react'
import "./AddNewPostModal.css"
import { useAuth } from '../../context/AuthContext'
import { AddNewPostModalHelper } from './AddNewPostModalHelper'

type ModalChildrens = {
    onClickX?: boolean
}

function AddNewPostModal(props:ModalChildrens) {
    const authCtx = useAuth();
    const {setImage, setDescription, submitAddNewPost} = AddNewPostModalHelper();

  return (
    <div className='addNewPostModal__con'>
        <div>
            <i onClick={authCtx.closeModalFunction} className='fas fa-times mr-12 mt-5 cursor-pointer text-3xl text-white absolute right-0' />
        </div>
        <form className='px-10 pt-5' onSubmit={submitAddNewPost}>
            <div>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>{
                    setImage(e.target.value);
                }} placeholder='Add image link' type="text" />
            </div>
            <div>
                <textarea onChange={(e) =>{
                    setDescription(e.target.value)
                }} placeholder='Description'></textarea>
            </div>
            <div>
                <button type='submit'>Add New Post</button>
            </div>
        </form>
    </div>
  )
}

export default AddNewPostModal