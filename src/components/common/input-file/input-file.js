import React, {Component} from 'react'
import style from './input-file.module.scss';
import classNames from 'classnames';



const InputFile = props => {
  const onChangeFile = e => {
    if (e.target.files[0]) {
      // const image = e.target.files[0];
      // props.onChangeFile(image, e.target)
      props.onChangeFile(e.target)
    }

  }

  return (
    <div>
      <label class={style.uploadFile}>
        {props.children}
        <input className={style.input} type="file" onChange={onChangeFile}  />
      </label>
    </div>
  )
}

export default InputFile;