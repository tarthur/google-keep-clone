import React, {Component} from 'react'
import baseBtn from '../../../styles/btn.module.scss'
import style from './add-btn.module.scss'


const addBtn = props => {
  return (
    <div className={`${baseBtn.btn} ${style.btn}`} role="button" onClick={props.onClick}>
      {props.text}
    </div>
  )
}

export default addBtn