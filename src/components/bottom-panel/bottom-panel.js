import React, {Component} from 'react'
import style from './bottom-panel.module.scss'

const BottomPanel = ({chooseСolor}) => {
  return (
    <div className={style.noteBottomPanel}>
      <div className={chooseСolor}>
        <ul className={style.bgColorBox}>
          <li>red</li>
          <li>green</li>
          <li>blue</li>
        </ul>
        <span>color</span>
      </div>
    </div>
  )
}



export default BottomPanel;