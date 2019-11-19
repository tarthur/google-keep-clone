import React, {Component} from 'react';
import cn from 'classnames';
import setImgPreview from '../../../utils/set-img-preview';
import style from './picture-preview.module.scss';


class PicturePreview extends Component {
  state = {
    picture: null
  }

  componentDidMount() {
    const {input} = this.props;
    if (typeof input === "string" ) this.setState({picture: input})
    else this.setImgPreview(input)
  }

  componentDidUpdate(prevProps, prevState) {
    
    if (prevProps.input === null && this.props.input) {
        this.setImgPreview(this.props.input)
    }

    if ((prevProps.input !== null) && (typeof this.props.input !== "string")) {
      // debugger
      // if (prevProps.input.files[0] !== this.props.input.files[0]) {
        this.setImgPreview(this.props.input)
      // }
    }
  }

  setImgPreview = (input) => {
    setImgPreview(input, (picture) => {
      this.setState({picture})
    })
  }

  render() {
    return (
      <div className={style.pictureBox}>
        {this.state.picture && (
          <div>
            <img className={cn('img-fluid', style.img)} 
                  src={this.state.picture} 
                  alt="Uploaded images" />
          </div>
        )}
        {/* {this.state.picture === null && <Spinner />} */}
      </div>
      )
  }
}

export default PicturePreview
