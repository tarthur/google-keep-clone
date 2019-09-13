import React, {Component} from 'react'
import style from './note-bottom-panel.module.scss'
import ChooseСolor from '../choose-color/choose-color'
import MoreButton from '../more-button/more-button'
// import className from 'classnames'

const NoteBottomPanel = ({getColor, getPanel, onClickDeleteBtn, classes}) => {
  // const mainClasses = classes.map(cls => style[cls]);
  
  return (
    // <div className={className(style.noteBottomPanel, mainClasses)}>
    <div className={style.noteBottomPanel}>
      <div className={style.icon}>
        <ChooseСolor getColor={getColor} />
      </div>
      <div className={style.icon}>
        <div><i class="far fa-image"></i></div>
      </div>
      <div className={style.icon}>
        <MoreButton getPanel={getPanel} 
                    toggle={<i class="fas fa-ellipsis-v"></i>}
                    items={[
                      {text: 'Удалить', onClick: onClickDeleteBtn},
                      {text: 'Создать Копию', onClick: () => {}},
                      {text: 'Добавить ярлык', onClick: () => {}}
                    ]} />
      </div>
    </div>
  )
}



export default NoteBottomPanel;