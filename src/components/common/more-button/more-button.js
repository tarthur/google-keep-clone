import React, {Component} from 'react'
import style from './more-button.module.scss'

// use
      // case 'more' :
      //   const {moreItems} = item;

      //   return (
      //     <div className={style.icon} data-tip="Еще">
      //       <MoreButton toggle={<i class="fas fa-ellipsis-v"></i>}
      //                   items={moreItems} />
      //     </div>
      //   )
class MoreButton extends Component {
  state = {
    isShowList: false
  }

  ddd = () => {
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

  ddd2 = () => {
    // this.setState({
    //   isShowList: false
    // })
    console.log('tttt')
  }

  render() {
    return (
      <div onClick={this.ddd} className={style.moreBox}>
        <i class="fas fa-ellipsis-v"></i>
      
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