import React, {Component} from 'react'
// import {connect} from 'react-redux';
// import {addNote} from '../../redux/notes-reducer'
// import BottomPanel from './../bottom-panel';
import style from './form.module.scss'




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
        <input type="text" className={style.formInput} placeholder="Новый пункт" 
               value={ this.state.value}
               onChange={ this.onChangeInputText }/>
      </div>
    );   
  }                        
}

export default Form;