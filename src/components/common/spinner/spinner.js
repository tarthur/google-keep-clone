import React from 'react';
import svg from './puff.svg'
import style from './spinner.module.scss';
import className from 'classnames'


const Spinner = props => {
  const mainClasses = props.classes ? props.classes.map(cls => style[cls]) : [];

  return (
    <div className={style.spinner}>
      <img className={className(style.spinnerImg, mainClasses)} src={svg} alt="" />
    </div>
  );
};

export default Spinner;
