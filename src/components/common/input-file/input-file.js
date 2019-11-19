import React from 'react';
import ReactTooltip from 'react-tooltip';
import style from './input-file.module.scss';


const InputFile = props => {
  const onChangeFile = e => {
    const input = e.target;
    // always need to create new objects for the difference in arrays input.files[0]
    const inputClone = input.cloneNode(true);

    if (inputClone.files[0]) props.onChangeFile(inputClone)
  }

  const {tooltipText} = props;

  return (
    <div data-tip={tooltipText} onClick={e => e.stopPropagation()}>
      <label className={style.uploadFile}>
        {props.children}
        <input className={style.input} type="file" onChange={onChangeFile}  />
        {tooltipText && <ReactTooltip place="bottom" type="dark" effect="solid"/>}
      </label>
    </div>
  )
}

export default InputFile;
