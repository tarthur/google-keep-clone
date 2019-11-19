import React from 'react';
import baseBtn from '../../../styles/btn.module.scss';
import style from './add-btn.module.scss';


const addBtn = ({ text, onClick }) => {
  return (
    <div className={`${baseBtn.btn} ${style.btn}`} role="button" onClick={onClick}>
      {text}
    </div>
  )
}

export default addBtn
