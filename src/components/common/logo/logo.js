import React from 'react';
import logo from './logo.png';
import style from './logo.module.scss';


const Logo = () => {
  return (
    <div className={style.logo}>
      <div className={style.logoIcon}>
        <img src={logo} className="img-fluid" />
      </div>
      <div className={style.logoName}>Keep clone</div>
    </div>
  )
}

export default Logo;
