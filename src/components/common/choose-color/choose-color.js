import React, {Component} from 'react'
import style from './choose-color.module.scss';
import classNames from 'classnames';


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

  getColors = () => {
    let colors = ['#fff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'];

    return colors.map((item, i) => {
      let borderColor = item;

      if (i === 0) borderColor = '#eee'
      
      return <li className={style.listItem} 
                  style={{backgroundColor: item, borderColor}} 
                  onClick={() => this.props.getColor(item)} />
    });
  }

  getList = () => {
    return this.state.isShowList &&
            <div className={style.box}>
              <ul className={style.list}>
                {this.getColors()}
              </ul>
            </div>
  }

  render() {
    

    return (
      <div className={style.chooseColor} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <span className={style.title}>
          <i class="fas fa-palette"></i>
        </span>
        {this.getList()}
      </div>
    )
  }
}