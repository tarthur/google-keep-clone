const getImgSizes = (input, callback) => {
  const image = input.files[0];

  if (image) {
    let _URL = window.URL || window.webkitURL;
    let imageInstance = new Image();

    imageInstance.onload = function() {
      const imgWidth = this.width;
      const imgHeight = this.height;

      callback(imgWidth, imgHeight) 
    };

    imageInstance.src = _URL.createObjectURL(image);
  }
}

export default getImgSizes;