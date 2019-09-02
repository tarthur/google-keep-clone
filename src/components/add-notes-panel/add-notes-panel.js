import React from 'react'

const AddNotesPanel = ({addSimpleNote, addListNote, addImgNote, onClick}) => {
  return (
    <div>
      <div onClick={onClick}>
        <input type="text" />
      </div>
      <button onClick={addSimpleNote}>Добавить заметку</button>
      <button onClick={addListNote}>Добавить лист</button>
      <button onClick={addImgNote}>Добавить заметку-изображение</button>
    </div>
  )
}

export default AddNotesPanel