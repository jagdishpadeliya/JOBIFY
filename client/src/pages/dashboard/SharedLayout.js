import React from 'react'
import {Outlet, Link} from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import BigSidebar from '../../components/BigSidebar';
import Navbar from '../../components/Navbar';
import SmallSidebar from '../../components/SmallSidebar';
import { useAppContext } from '../../context/appContext'
function SharedLayout() {
  const {user} = useAppContext();
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar/>
        <BigSidebar/>
        <div>
          <Navbar/>
          <div className='dashboard-page'>
            <Outlet/>
          </div>
        </div>
      </main>    
    </Wrapper>
  )
}

export default SharedLayout