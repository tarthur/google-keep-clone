import React, {Component} from 'react'

class AddNotesPanel extends Component {
  state = {
    addInputText: '',
    type: ''
  }

  onClickAddBtn = () => {
    this.props.onClickAddBtn({
      text: this.state.addInputText,
      type: this.state.type
    });
    this.setState({
      addInputText: '',
      type: ''
    })
  }

  onChange = e => this.setState({addInputText: e.target.value})
  addType = type => this.setState({type})

  getPanel = () => {
    switch(this.state.type) {
      case 'note' :
        return (
          <div>
            <input type="text" value={this.state.addInputText} onChange={this.onChange} />
            <button onClick={this.onClickAddBtn}>Добавить</button>
          </div>
        )
      case 'list' :
        return (
          <div>
            <input type="text" value={this.state.addInputText} onChange={this.onChange} />
            <button onClick={this.onClickAddBtn}>Добавить</button>
          </div>
        )
      case 'img' :
        return (
          <div>
            <input type="text" value={this.state.addInputText} onChange={this.onChange} />
            <button onClick={this.onClickAddBtn}>Добавить</button>
          </div>
        )
      default :
        return (
          <div>
            <div>
              <input type="text" />
            </div>
            <button onClick={() => this.addType('note')}>Добавить заметку</button>
            <button onClick={() => this.addType('list')}>Добавить лист</button>
            <button onClick={() => this.addType('img')}>Добавить заметку-изображение</button>
          </div>
        )
    }
  }

  render() {
    return this.getPanel()
  }
}

export default AddNotesPanel