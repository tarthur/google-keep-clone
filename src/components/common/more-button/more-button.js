import React, {Component} from 'react';
import style from './more-button.module.scss';


class MoreButton extends Component {
  state = {
    isShowList: false
  }

  onClick = () => {
    this.setState(state => {
      return {
        isShowList: !state.isShowList
      }
    });
  }

  getItems = () => {
    return this.props.items.map(item => {
      return <li onClick={item.onClick}>{item.text}</li>
    })
  }

  render() {
    return (
      <div onClick={this.onClick} className={style.moreBox}>
        <i className="fas fa-ellipsis-v"></i>
      
        {this.state.isShowList &&
          <div className={style.listBox}>
            <ul className={style.bgColorBox}>
              {this.getItems()}
            </ul>
          </div>
        }
      </div>
    )
  }
}


export default MoreButton;
