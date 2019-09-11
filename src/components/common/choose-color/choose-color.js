import React, {Component} from 'react'
import './choose-color.scss'

export default class ChooseColor extends Component {
  state = {
    isShowList: false
  }

  onMouseEnter = () => {
    this.setState({
      isShowList: true
    })
  }

  onMouseLeave = () => {
    this.setState({
      isShowList: false
    })
  }

  getList = () => {
    return this.state.isShowList &&
            <div className="choose-color__box">
              <ul className="choose-color__list">
                <li className="choose-color__list-item" onClick={() => this.props.getColor('red')}>red</li>
                <li className="choose-color__list-item" onClick={() => this.props.getColor('green')}>green</li>
                <li className="choose-color__list-item" onClick={() => this.props.getColor('blue')}>blue</li>
              </ul>
            </div>
  }

  render() {
    return (
      <div className="choose-color" 
            onMouseEnter={this.onMouseEnter} 
            onMouseLeave={this.onMouseLeave}>
        <span className="choose-color__title">
          <i class="fas fa-palette"></i>
        </span>
        {this.getList()}
      </div>
    )
  }
}