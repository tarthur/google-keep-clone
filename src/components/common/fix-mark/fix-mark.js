import React, {Component} from 'react'
import style from './fix-mark.module.scss'
import ReactTooltip from 'react-tooltip'

const FixMark = props => {
  return (
    <div className={style.fixMark} onClick={props.onClick} data-tip="Закрепить" >
      <i class="fas fa-thumbtack"></i>
      <ReactTooltip place="bottom" type="dark" effect="solid"/>
    </div>
  )
}

export default FixMark