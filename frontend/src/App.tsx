import React from 'react';
import logo from './logo.svg';
import { Route, Routes } from "react-router-dom"
import './App.css';

import Index from './pages/Index/Index';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import OneUser from './pages/OneUser/OneUser';

import ProtectedRoute from './PrivateRoutes/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute />}>
        <Route path='/' element={<Index />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/profile/:slug' element={<OneUser />} />
      </Route>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
