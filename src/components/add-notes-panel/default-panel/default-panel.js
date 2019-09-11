import React, {Component} from 'react'


const DefaultPanel = props => {
  const { setPanelView } = props;

  return (
    <React.Fragment>
      <div className="notes-panel__textarea" onClick={() => setPanelView('note')} >
        Заметка…
      </div>
      <div className="notes-panel__icon notes-panel__list-icon" onClick={() => setPanelView('list')} >
        <i class="far fa-check-square"></i>
      </div>
      <div className="notes-panel__icon notes-panel__img-icon" onClick={() => setPanelView('img')}>
      <i class="far fa-image"></i>
      </div>
    </React.Fragment>
  )
}

export default DefaultPanel;