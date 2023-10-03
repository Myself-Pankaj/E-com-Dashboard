import React from 'react'
import Sidebar from '../Dashboard/Sidebar'
import AllUser from '../User/AllUser'

const User = () => {
  return (
    <div className="App">
    <div className='AppGlass'>
      <Sidebar/>
      <AllUser/>
     
    </div>
    </div>
  )
}

export default User