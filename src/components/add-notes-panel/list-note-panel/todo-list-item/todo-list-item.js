import React, {Component} from 'react'
import './todo-list-item.scss'



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
    let liClasses = 'list-item ' + (this.props.className || '');
  
    if ( this.props.checkbox ) liClasses += ' ' + 'list-item_active';

    return (
      <li className={ liClasses }>
        <div className="list-item__checkbox"
             onClick={  onClickCompletedCheckbox } >
        </div>
        <input className="list-item__input"
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