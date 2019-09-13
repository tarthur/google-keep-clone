import React, {Component} from 'react'
import style from './default-panel.module.scss'
import className from 'classnames'


const DefaultPanel = props => {
  const { setPanelView } = props;

  return (
    <React.Fragment>
      <div className={style.textarea} onClick={() => setPanelView('note')} >
        Заметка…
      </div>
      <div className={className(style.icon, style.listIcon)} onClick={() => setPanelView('list')} >
        <i class="far fa-check-square"></i>
      </div>
      <div className={className(style.icon, style.imgIcon)} onClick={() => setPanelView('img')}>
      <i class="far fa-image"></i>
      </div>
    </React.Fragment>
  )
}

export default DefaultPanel;