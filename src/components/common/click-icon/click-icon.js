import React, {Component} from 'react'
import style from './click-icon.module.scss'
import ReactTooltip from 'react-tooltip'


class ClickIcon extends Component {
  onClick = e => {
    e.stopPropagation();
    this.props.onClick()
  }

  render() {
    const {tooltipText, tooltip} = this.props;

    return tooltip ? (
      <div className={style.clickIcon} onClick={this.onClick} data-tip={tooltipText} >
        {this.props.children}
        <ReactTooltip place="bottom" type="dark" effect="solid" />
      </div>
    ) : (
      <div className={style.clickIcon} onClick={this.onClick}>
        {this.props.children}
      </div>
    )
  }
}

ClickIcon.defaultProps = {
  tooltip: true,
  tooltipText: 'tooltip'
};

export default ClickIcon