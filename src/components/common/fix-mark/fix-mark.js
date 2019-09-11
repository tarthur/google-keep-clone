import React, {Component} from 'react'
import './fix-mark.scss'

const FixMark = props => {
  return (
    <div className="fix-mark" onClick={props.onClick}>
      <i class="fas fa-thumbtack"></i>
    </div>
  )
}

export default FixMark