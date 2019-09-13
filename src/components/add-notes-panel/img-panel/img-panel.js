import React, {Component} from 'react'
import {storage} from '../../../config/fbConfig';
import {connect} from 'react-redux';
import {addNote} from '../../../redux/notes-reducer'
import BottomPanel from '../../bottom-panel';



class notePanel extends Component {
  state = {
    value: '',
    type: 'img',

    image: null,
    url: '',
    imgName: null,
    progress: 0,

    imgWidth: null, 
    imgHeight: null,
  }

  handleChange = e => {
    const $this = this;

    if (e.target.files[0]) {
      let _URL = window.URL || window.webkitURL;
      let image222 = new Image();
      

      image222.onload = function() {
        const imgWidth = this.width;
        const imgHeight = this.height;

        $this.setState({imgWidth, imgHeight})
      };
      image222.src = _URL.createObjectURL(e.target.files[0]);


      const image = e.target.files[0];
      this.setState(() => ({image}));
      
      this.handleUpload(image)
    }
  }

  handleUpload = (image) => {
      const name = new Date().getTime() + "." + image.name.split('.').pop();

      // new Date().getTime()
      console.log('->>>>>>>')
      console.log(image.name)

      const uploadTask = storage.ref(`images/${name}`).put(image);

      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      }, 
      (error) => {
           // error function ....
           alert(error.message_)
        console.log(error);
      }, 
    () => {
        storage.ref('images').child(name).getDownloadURL()
          .then(url => {

            this.setState(state => {
              this.props.setData({
                url,
                imgName: name,
                type: state.type,
                imgWidth: state.imgWidth, 
                imgHeight: state.imgHeight,
              });

              return {url}
            });
          })
    });
  }

  onChange = e => this.setState({addInputText: e.target.value})
  onClick = () => {
    this.props.onClick(this.state);
  }

  render() {
    return (
      <div>
        <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400"/>
        <input type="file" onChange={this.handleChange}/>
        <input type="text" value={this.value} onChange={this.onChange} />
      </div>
    )
  }
}

export default notePanel;