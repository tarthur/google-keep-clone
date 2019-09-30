import React, {Component} from 'react'
import style from './click-icon.module.scss'
import ReactTooltip from 'react-tooltip'


const ClickIcon = props => {
  const onClick = e => {
    e.stopPropagation();
    props.onClick()
  }

  const {tooltipText} = props;

  return (
    <div className={style.clickIcon} onClick={onClick} data-tip={tooltipText} >
      {props.children}
      <ReactTooltip place="bottom" type="dark" effect="solid" />
    </div>
  )
}

export default ClickIcon