import React, {Component} from 'react';
import style from './note-panel.module.scss';
import autosize from 'autosize';

class notePanel extends Component {
  input = React.createRef();

  state = {
    value: this.props.value || '',
  }

  componentDidMount() {
    autosize(this.input.current);
  }
  
  onChange = e => {
    this.setState({value: e.currentTarget.value});
    this.props.getText(e.currentTarget.value)
  }

  deactivateEditMode() {
    this.setState( {
      editMode: false
    });
  }

  activateEditMode = () => {
    this.setState( {
      editMode: true
    } );
  }

  render() {
    return (
      <div className={style.notePanel}>
        <textarea className={style.textarea} 
                type="text" value={this.state.value} 
                placeholder={this.props.placeholder || "Заметка"}
                onChange={this.onChange} 
                ref={this.input} />
      </div>
    )
  }
}

export default notePanel;
