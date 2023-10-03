import React from 'react'
import Sidebar from '../Dashboard/Sidebar'
import AllProducts from '../Products/AllProducts'
import ProductCard from '../Products/ProductCard'

const Items = () => {
  return (
    <div className="App">
    <div className='AppGlass'>
      <Sidebar/>
      <AllProducts/>
      <ProductCard/>
    </div>
    </div>
  )
}

export default Items