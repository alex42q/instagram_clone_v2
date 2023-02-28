import { LoginHelper } from './LoginFormHelper'
import React, {useEffect} from 'react';
import { useLoader } from '../../context/LoaderContext';


function LoginForm() {
    const {getEmailOrPhone, setLoader, getPassowrd, LoginFormHeler} = LoginHelper(); 
    const loaderCtx = useLoader()


  return (<div>
    {setLoader === true ? <>
            <div className="load">
    <div className="load-one"></div>
    <div className="load-two"></div>
    <div className="load-three"></div>
  </div>
        </> : <>
        <div className='register__form_con'>
        <form onSubmit={LoginFormHeler}>
        <div className='register__form_top mb-5'>
            <h1 className='mb-5 text-3xl font-bold'>Instagram</h1>
            <p className='register__top_p'>
            Συνδεθείτε για να βλέπετε φωτογραφίες και βίντεο από τους φίλους σας.
            </p>
        </div>
        <div className='w-full'>
            <div className='mb-2 w-full'>
                <input onChange={(e) =>{
                    getEmailOrPhone(e.target.value)
                }} className='register__form__input' type="text" placeholder='email ή Αριθμός κινητού' />
            </div>
            <div className='mb-2'>
                <input onChange={(e) =>{
                    getPassowrd(e.target.value)
                }} className='register__form__input' type="password" placeholder='Κωδικός πρόσβασης' />
            </div>
        </div>
        <div className='register__form__btn mt-5'>
            <button type='submit'>Επόμενο</button>
        </div>
        </form>
        </div>
        </>}
    </div>

  )
}

export default LoginForm