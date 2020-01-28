import React from 'react'
import { useSelector } from 'react-redux'

const Browser = () => {
  const user = useSelector(s => s.user)

  return (
    <div className="browser-main-layout">
      <header className="header-layout">
        
      </header>
    </div>
  )
}

export default Browser