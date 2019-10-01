import React, {Component} from 'react'
import style from './fix-mark.module.scss'
import ReactTooltip from 'react-tooltip'
import cn from 'classnames'


const FixMark = props => {
  const checkMark = props.check ? style.check : '';
  const textMark = props.check ? 'Открепить' : 'Закрепить'

  const onClick = e => {
    e.stopPropagation();
    props.onClick()
  }

  return (
    <div className={cn(style.fixMark, checkMark)} onClick={onClick} data-tip={textMark} >
      <i className="fas fa-thumbtack"></i>
      <ReactTooltip place="bottom" type="dark" effect="solid"/>
    </div>
  )
}

export default FixMark