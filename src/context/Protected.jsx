import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
  const id = localStorage.getItem('adminId')
  return id ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes
