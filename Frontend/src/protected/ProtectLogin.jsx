import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useStore from '../zustand/useStore.js'

const ProtectLogin = () => {
  const { user,loading } = useStore();
  if(loading) return <p>Loding...</p>
  return !user ? <Outlet /> : <Navigate to='/' />
}

export default ProtectLogin