import React, {Component} from 'react'
import style from './note-bottom-panel.module.scss'

const NoteBottomPanel = ({onClickDeleteBtn, chooseСolor}) => {
  return (
    <div className={style.noteBottomPanel}>
      <button onClick={onClickDeleteBtn}>-</button>
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



export default NoteBottomPanel;