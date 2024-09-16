import React from 'react'
import UserHeader from '../../components/UserHeader/UserHeader'
import { Outlet } from 'react-router-dom'
import UserFooter from '../../components/UserFooter/UserFooter'

const UserTemplate = () => {
  return (
    <div>
      <header>
      <UserHeader/>
      </header>

      <main className='bg-gray-200/90 h-screen-full'>
        <Outlet/>
      </main>

      <footer> 
        <UserFooter/>
      </footer>
      
    </div>
  )
}

export default UserTemplate
