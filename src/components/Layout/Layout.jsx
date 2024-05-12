import React, { useContext, useEffect } from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { userContext } from '../../context/TokenContext';

export default function Layout() {
let {setuserToken} = useContext(userContext)
  useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
      setuserToken(localStorage.getItem('userToken'))
    }

  } )
  return (
    <div>
      <Navbar/>
      <div className='container'>
      <Outlet/>
      </div>
    </div>
  )
}
