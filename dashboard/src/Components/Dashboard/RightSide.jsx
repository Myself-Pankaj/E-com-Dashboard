import React from 'react'

import Review from '../Layout/RightSide/Review/Review'
import Users from '../Layout/RightSide/Updates/Users'

const RightSide = () => {
  return (
    <div className='RightSide'>
      <div>
        <h3>Users</h3>
        <Users/>
      </div>
      <div>
        <h3>Customer Review</h3>
        <Review/>
      </div>
    </div>
  )
}

export default RightSide