import React, { Component } from 'react';


const WithImgHeightLoader = (View) => {
  return class extends Component {
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
      alert(this.state.boxWidth)
      return (
        <div className="img-height-loader" ref={this.box}>
          {this.props.note.imgHeight && (
            <View {...this.props} width={this.state.boxWidth} />
          )}
        </div>
      )
    }
  }
};

export default WithImgHeightLoader;
