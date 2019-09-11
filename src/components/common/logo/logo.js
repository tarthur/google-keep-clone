import React, { Component } from 'react';
import logo from './logo.png';
import './logo.scss'


const Logo = props => {
  return (
    <div className={`${props.className} logo`}>
      <div className="logo__icon">
        <img src={logo} className="img-fluid" />
      </div>
      <div className="logo__name">
        Keep clone
      </div>
    </div>
  )
}

export default Logo;