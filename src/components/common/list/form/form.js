import React from 'react';
import style from './form.module.scss';


class Form extends React.Component {
  state = {
    value: ""
  }

  onChangeInputText = (e) => {
    this.props.onChangeForm(e.target.value);
    this.setState({ value: "" });
  }

  render() {
    return (
      <div className={style.form}>
        <div className={style.icon}>
          <i className="fas fa-plus" />
        </div>
        <input type="text" className={style.formInput} placeholder="Новый пункт" 
               value={ this.state.value}
               onChange={ this.onChangeInputText }/>
      </div>
    );   
  }                        
}

export default Form;
