import React, {Component} from 'react'
import './note-bottom-panel.scss'
import ChooseСolor from '../choose-color/choose-color'
import MoreButton from '../more-button/more-button'

const NoteBottomPanel = ({getColor, getPanel, onClickDeleteBtn}) => {
  
  return (
    <div className="note-bottom-panel">
      <div className="note-bottom-panel__icon">
        <ChooseСolor getColor={getColor} />
      </div>
      <div className="note-bottom-panel__icon">
        <div><i class="far fa-image"></i></div>
      </div>
      <div className="note-bottom-panel__icon note-bottom-panel__icon_3">
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