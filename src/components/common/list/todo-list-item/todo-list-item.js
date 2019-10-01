import React, {Component} from 'react'
import cn from 'classnames'
import style from './todo-list-item.module.scss'



class ListItem extends Component {
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
    let liClasses = cn(style.listItem, [(this.props.className || ''), (this.props.checkbox ? style.active : '')]);

    // if ( this.props.checkbox ) liClasses += className(liClasses, style.acitve);

    
    return (
      <li className={ liClasses}>
        <div className={style.checkbox}
             onClick={onClickCompletedCheckbox} >
          <i className={cn("fas fa-check", style.checkboxMark)}></i>
        </div>
        <input className={style.input}
               type="text"
               value={ value }
               onChange={ (e) => onChangeTextField(e.target.value) }
               ref={ this.input } 
            />
        <div className={style.closeBtn} 
           onClick={ onDeleteTodoListItem } >
            <i className="fas fa-times"></i>
        </div>
      </li>
    );
  }                           
}

export default ListItem;