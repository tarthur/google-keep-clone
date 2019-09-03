import React, {Component} from 'react'
// import {connect} from 'react-redux';
// import {addNote} from '../../redux/notes-reducer'
// import BottomPanel from './../bottom-panel';
import style from './todo-list-item.module.scss'



class TodoListItem extends Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  componentDidMount() {
    if (this.props.focus) {
      this.input.current.focus();
    }
  }

  render() {
    const { value, checkbox, 
            onDeleteTodoListItem, onChangeTextField, onClickCompletedCheckbox} = this.props;
    let liClasses = style.listItem;
  
    if ( this.props.checkbox ) liClasses += ' ' + style.active;

    return (
      <li className={ liClasses }>
        <div className={ style.checkbox }
             onClick={  onClickCompletedCheckbox } >
        </div>
        <input className={style.input}
               type="text"
               value={ value }
               onChange={ (e) => onChangeTextField(e.target.value) }
               ref={ this.input } 
            />
        <i className={style.closeBtn} 
           onClick={ onDeleteTodoListItem } ></i>
      </li>
    );
  }                           
}

export default TodoListItem;