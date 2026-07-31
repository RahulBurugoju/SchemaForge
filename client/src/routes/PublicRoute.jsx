import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
function PublicRoute() {
     const { isAuthenticated  } = useSelector((state) => state.auth);
     const dispatch = useDispatch()

     if(isAuthenticated){
        return <Navigate to="/dashboard" replace/>
     }
  return (
    <Outlet/>
  )
}

export default PublicRoute