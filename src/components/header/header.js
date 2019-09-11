import React from 'react'
import Logo from '../common/logo'
import './header.scss'


const Header = () => {
  return (
    <div className="header">
      <div className="header__container container">
        <div className="header__main">
          <Logo className="header__logo" />
        </div>
      </div>
    </div>
  )
}

export default Header