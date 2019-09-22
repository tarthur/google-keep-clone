import React, {Component} from 'react'
import style from './fix-mark.module.scss'
import ReactTooltip from 'react-tooltip'
import cn from 'classnames'


const FixMark = props => {
  const checkMark = props.check ? style.check : '';
  const textMark = props.check ? 'Открепить' : 'Закрепить'

  return (
    <div className={cn(style.fixMark, checkMark)} onClick={props.onClick} data-tip={textMark} >
      <i class="fas fa-thumbtack"></i>
      <ReactTooltip place="bottom" type="dark" effect="solid"/>
    </div>
  )
}

export default FixMark