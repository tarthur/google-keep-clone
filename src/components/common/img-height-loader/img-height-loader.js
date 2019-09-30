import React, {Component} from 'react'
import ImgBox from '../img-box/img-box'


class ImgHeightLoader extends Component {
  box = React.createRef()

  state = {
    boxWidth: null,
  }

  componentDidMount() {
    this.setState({
      boxWidth: this.box.current.offsetWidth,
    })

    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions = () => {
    this.setState({ boxWidth: this.box.current.offsetWidth });
  }

  render() {
    return (
      <div className="img-height-loader" ref={this.box}>
        {this.props.note.imgHeight && (
          <ImgBox note={this.props.note} width={this.state.boxWidth} />
        )}
      </div>
    )
  }
}

export default ImgHeightLoader