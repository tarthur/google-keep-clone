import React, {Component} from 'react'
import style from './default-panel.module.scss'
import ClickIcon from '../../common/click-icon'
import className from 'classnames'
import InputFile from '../../common/input-file/input-file'


const DefaultPanel = props => {
  const { setPanelView } = props;

  return (
    <React.Fragment>
      <div className={style.textarea} onClick={() => setPanelView('note')} >
        Заметка…
      </div>
      <div className={className(style.icon, style.listIcon)} onClick={() => setPanelView('list')} >
        <ClickIcon tooltipText="Создать список" 
                   onClick={() => setPanelView('list')}>
          <i className="far fa-check-square"></i>
        </ClickIcon>
      </div>
      <div className={className(style.icon, style.imgIcon)}>
        <InputFile onChangeFile={input => setPanelView('note', input)} 
                    tooltipText="Создать фотозаметку">
          <i className="far fa-image" />
        </InputFile>
      </div>
    </React.Fragment>
  )
}

export default DefaultPanel;