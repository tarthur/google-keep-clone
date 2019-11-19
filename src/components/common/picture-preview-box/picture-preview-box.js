import React from 'react';
import PicturePreview from '../picture-preview';
import ClickIcon from '../click-icon';
import style from './picture-preview-box.module.scss';


const PicturePreviewBox = ({ input, onDelete }) => {
  return (    
    <div className={style.pictureBox}>
      {input && (
        <div className={style.picturePreview}>
          <PicturePreview input={input} />
        </div>
      )}
      <div className={style.deleteIcon}>
        <ClickIcon onClick={onDelete} tooltipText="Удалить картинку">
          <i className="far fa-trash-alt" />
        </ClickIcon>
      </div>
    </div>
  )
}

export default PicturePreviewBox
