import React from 'react'
import { useContext } from 'react'
import { Page3dataContext } from '../Contexts/Page3dataContext'

const PastPlans = () => {
  
  const {page3data}=useContext(Page3dataContext)
  return (
    <div>
      <div>PastPlans</div>
      <div>
        {page3data}
      </div>
    </div>
  )
}

export default PastPlans