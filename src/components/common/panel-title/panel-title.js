import React, {Component} from 'react'
import style from './panel-title.module.scss'

export default class PanelTitle extends Component {
  state = {
    title: '',
  }

  onTitleChange = (e) => {
    this.setState({
      title: e.currentTarget.value
    });

    this.props.getTitle(e.currentTarget.value)
  }

  render() {
    return (
      <div className={style.panelTitle}>

        
      <input className={style.input}
              onChange={this.onTitleChange} 
              value={this.state.title} 
              placeholder="Заголовок"  />
      </div>
    )
  }
}