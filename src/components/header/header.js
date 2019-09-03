import React from 'react'
import style from './header.module.scss'
import logo512 from './../../assets/images/logo512.png'

const Header = () => {
  return (
    <div className={style.header}>
      <div className="container">
        <div className={style.main}>
          <div className={style.logo}>
            <img src={logo512} className="img-fluid" />
          </div>
          Keep clone
        </div>
      </div>
    </div>
  )
}

export default Header