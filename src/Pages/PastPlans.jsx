import React from 'react'
import { useContext } from 'react'
import { Page3dataContext } from '../Contexts/Page3dataContext'
import { LoginContext } from '../Contexts/LoginContext'
const PastPlans = () => {
  const {userName}=useContext(LoginContext)
  const {page3data}=useContext(Page3dataContext)
  return (
    <div>
      <div>Past Plans: {userName}</div>
      <div>
        {page3data}
      </div>
    </div>
  )
}

export default PastPlans