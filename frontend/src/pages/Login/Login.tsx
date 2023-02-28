import React, {useEffect} from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { LoginHelper } from '../../components/LoginForm/LoginFormHelper'
import { useAuth } from '../../context/AuthContext'
import { Outlet, Navigate } from "react-router-dom";
import { useLoader } from '../../context/LoaderContext';

function Login() {
  const authCtx = useAuth();
  const loaderCtx = useLoader()

  useEffect(() =>{
      loaderCtx.loader = false
  }, [loaderCtx.loader])

  return (
    !authCtx.isAuthenticated ? <LoginForm/> : <Navigate to="/" />
  )
}

export default Login