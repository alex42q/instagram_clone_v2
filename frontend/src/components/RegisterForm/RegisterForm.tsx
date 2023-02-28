import React, {useEffect, useState} from 'react'
import "./RegisterForm.css"
import { RegisterUser } from '../../services/Services'
import { SplitFirstNameAndLastName } from './RegisterFormHelper'

type User = {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phone:string;
}

function RegisterForm({}) {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    
    const onRegister = () =>{
        const user:User = {
            firstName:SplitFirstNameAndLastName(fullName)[0],
            lastName: SplitFirstNameAndLastName(fullName)[1],
            email:email,
            password:password,
            phone:phone
        }
        RegisterUser(user)
        .then(res=>{
            window.location.reload()
        })
        .catch(err=>{
            console.log(err)
        })
    }

  return (
    <div className='register__form_con'>
        <form onSubmit={onRegister}>
        <div className='register__form_top mb-5'>
            <h1 className='mb-5 text-3xl font-bold'>Instagram</h1>
            <p className='register__top_p'>
            Γραφτείτε για να βλέπετε φωτογραφίες και βίντεο από τους φίλους σας.
            </p>
        </div>
        <div className='w-full'>
            <div className='mb-2 w-full'>
                <input onChange={(e) =>{
                    setEmail(e.target.value)
                }} className='register__form__input' type="text" placeholder='email' />
            </div>
            <div className='mb-2 w-full'>
                <input onChange={(e) =>{
                    setPhone(e.target.value)
                }} className='register__form__input' type="text" placeholder='Αριθμός κινητού' />
            </div>
            <div className='mb-2'>
                <input onChange={(e) =>{
                    setFullName(e.target.value)
                }} className='register__form__input' type="text" placeholder='Ονοματεπώνυμο' />
            </div>
            <div className='mb-2'>
                <input onChange={(e) =>{
                    setPassword(e.target.value)
                }} className='register__form__input' type="password" placeholder='Κωδικός πρόσβασης' />
            </div>
        </div>
        <div className='register__form__bottom_text w-full'>
            <p>Τα άτομα που χρησιμοποιούν την υπηρεσία μας ενδέχεται να έχουν ανεβάσει τα στοιχεία επικοινωνίας σας στο Instagram. Μάθετε περισσότερα</p>
        </div>
        <div className='register__form__bottom_text2'>
            <p>Αν εγγραφείτε, δηλώνετε ότι συμφωνείτε με τους Όρους χρήσης. Ενημερωθείτε για το πώς συγκεντρώνουμε, χρησιμοποιούμε και κοινοποιούμε τα δεδομένα σας διαβάζοντας την Πολιτική απορρήτου μας και πώς χρησιμοποιούμε τα cookies και παρόμοιες τεχνολογίες διαβάζοντας την Πολιτική για τα cookies.</p>
        </div>
        <div className='register__form__btn mt-5'>
            <button type='submit'>Επόμενο</button>
        </div>
        </form>
    </div>
  )
}

export default RegisterForm