import React, {Component} from 'react'
import style from './fix-mark.module.scss'
import ClickIcon from '../../common/click-icon'
import cn from 'classnames'


class FixMark extends Component {
  state = {
    checkMark: this.props.check,
    textMark: this.props.check ? 'Открепить' : 'Закрепить'
  }

  onClick = () => {
    this.setState(({checkMark}) => {
      this.props.onClick()
      return {checkMark: checkMark === ''}
    });
  }

  render() {
    const checkMark = this.state.checkMark ? style.check : '';

    return (
      <div className={cn(style.fixMark, checkMark)} data-tip={this.state.textMark} >
        <ClickIcon tooltipText={this.state.textMark} onClick={this.onClick}>
          <i className="fas fa-thumbtack" />
        </ClickIcon>
      </div>
    )
  }
}

export default FixMark