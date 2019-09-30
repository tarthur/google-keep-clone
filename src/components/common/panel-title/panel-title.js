import React, {Component} from 'react'
import cn from 'classnames'
import autosize from 'autosize'
import style from './panel-title.module.scss'

export default class PanelTitle extends Component {
  textarea = React.createRef();

  state = {
    title: this.props.value || '',
  }

  componentDidMount() {
    autosize(this.textarea.current);
  }

  onTitleChange = (e) => {
    this.setState({title: e.currentTarget.value});
    this.props.getTitle(e.currentTarget.value)
  }

  render() {
    // const mainClasses = props.classes ? props.classes.map(cls => style[cls]) : [];
    const textareaClass = this.props.textareaClass ? this.props.textareaClass : ''

    return (
      <div className={style.panelTitle}>
        <textarea className={cn(style.textarea, this.props.textareaClass)}
                  onChange={this.onTitleChange} 
                  value={this.state.title} 
                  placeholder="Заголовок" 
                  ref={this.textarea} />
      </div>
    )
  }
}