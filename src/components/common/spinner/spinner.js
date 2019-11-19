import React from 'react';
import cn from 'classnames';
import svg from './puff.svg';
import style from './spinner.module.scss';


const Spinner = props => {
  const mainClasses = props.classes ? props.classes.map(cls => style[cls]) : [];

  return (
    <div className={style.spinner}>
      <img className={cn(style.spinnerImg, mainClasses)} src={svg} alt="" />
    </div>
  );
};

export default Spinner;
