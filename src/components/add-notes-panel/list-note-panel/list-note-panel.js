import React from 'react';
import List from '../../common/list';
import style from './list-note-panel.module.scss';


const ListNotePanel = ({getList}) => {
  
  const returningItems = lists => getList({ lists });

  return (
    <div className={style.listWrap}>
      <List returningItems={returningItems} />
    </div>
  )
}

export default ListNotePanel;
