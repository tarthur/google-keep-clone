import React, {Component} from 'react'
import style from './choose-color.module.scss';
import cn from 'classnames';


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
    let colors = ['#ffffff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'];

    return colors.map((item, i) => {
      let borderColor = item;
      let currentColor = null;

      if (this.props.currentColor === item) currentColor = style.currentColor
      if (i === 0) borderColor = '#eee'
      
      return <li className={cn(style.listItem, currentColor)} 
                  style={{backgroundColor: item, borderColor}} 
                  onClick={e => {
                    e.stopPropagation()
                    this.props.getColor(item)
                  }}>
                {currentColor && (
                  <i className={cn("fas fa-check", style.mark)}></i>
                )}
             </li>
    });
  }

  getList = () => {
    
    return this.state.isShowList &&
            <div className={cn(style.box, this.props.position ? style[this.props.position] : style.positionTopLeft)}>
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