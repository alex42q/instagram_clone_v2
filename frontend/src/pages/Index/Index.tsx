import React, {useContext, useEffect} from 'react'
import { useAuth } from '../../context/AuthContext'
import Nav from '../../components/Nav/Nav'
import MainComponent from '../../components/MainComponent/MainComponent'
import DetailsComp from '../../components/DetailsComp/DetailsComp'

function Index() {
  const authCtx = useAuth()

  useEffect(() =>{
      console.log(authCtx.userDetails)
  }, [])

  return (
    <div>
      <div className='indexPage__container'>
      <div>
      <Nav profile_photo={authCtx.userDetails.profile_photo}/>
      </div>
      <div className='flex items-start'>
        <MainComponent />
        <div className='mt-8 ml-16'>
        <DetailsComp 
          email={authCtx.userDetails.email}
          image={authCtx.userDetails.profile_photo}
          firstname={authCtx.userDetails.firstName}
          lastname={authCtx.userDetails.lastName}
        />
        </div>

      </div>
      </div>

    </div>
  )
}

export default Index