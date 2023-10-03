import React from 'react'
import Sidebar from '../Dashboard/Sidebar'
import Orders from '../Orders/Orders'

const Order = () => {
  return (
    <div className="App">
    <div className='AppGlass'>
      <Sidebar/>
      <Orders/>
     
    </div>
    </div>
  )
}

export default Order