import React, {Component} from 'react'
import './panel-title.scss'

export default class PanelTitle extends Component {
  state = {
    title: '',
  }

  onTitleChange = (e) => {
    this.setState({
      title: e.currentTarget.value
    });

    console.log(this.state.title)
  }

  render() {
    return (
      <div className="panel-title">

        
      <input className="panel-title__input"
              onChange={this.onTitleChange} 
              value={this.state.title} 
              placeholder="Заголовок"  />
      </div>
    )
  }
}