import React, {Component} from 'react';
import ImgBox from '../img-box/img-box';


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
    this.box = null
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions = () => {
    if (this.box) {
      this.setState({ boxWidth: this.box.current.offsetWidth });
    }
  }

  render() {
    return (
      <div className="img-height-loader" ref={this.box}>
        {this.props.note.imgHeight && (
          <ImgBox note={this.props.note} width={this.state.boxWidth} onLoad={this.props.onLoad} />
        )}
      </div>
    )
  }
}

export default ImgHeightLoader
