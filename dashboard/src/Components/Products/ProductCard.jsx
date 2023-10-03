import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = () => {
  return (
    <aside className="productSidebar">
      <h2>Sidebar</h2>
      <ul>
        <li>
          <Link to="/add-products">Add Product</Link>
        </li>
      </ul>
    </aside>
  )
}

export default ProductCard