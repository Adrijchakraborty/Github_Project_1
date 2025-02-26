import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useStore from '../zustand/useStore.js'
import Loading from '../components/Loading.jsx';

const ProtectLogin = () => {
  const { user,loading } = useStore();
  if(loading) return <Loading/>
  return !user ? <Outlet /> : <Navigate to='/' />
}

export default ProtectLogin