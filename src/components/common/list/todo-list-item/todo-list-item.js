import React, {Component} from 'react'
import className from 'classnames'
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
    let liClasses = className(style.listItem, [(this.props.className || ''), (this.props.checkbox ? style.active : '')]);

    // if ( this.props.checkbox ) liClasses += className(liClasses, style.acitve);

    console.log('----------')
    console.log(liClasses)
    return (
      <li className={ liClasses}>
        <div className={style.checkbox}
             onClick={  onClickCompletedCheckbox } >
        </div>
        <input className={style.input}
               type="text"
               value={ value }
               onChange={ (e) => onChangeTextField(e.target.value) }
               ref={ this.input } 
            />
        <i className="list-item__close-btn" 
           onClick={ onDeleteTodoListItem } ></i>
      </li>
    );
  }                           
}

export default TodoListItem;