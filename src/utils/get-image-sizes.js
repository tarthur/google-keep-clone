const getImgSizes = (input) => {
  let promise = new Promise((res, rej) => {

    const image = input.files[0];

    if (image) {
      let _URL = window.URL || window.webkitURL;
      let imageInstance = new Image();
  
      imageInstance.onload = function() {
        res({
          imgWidth: this.width,
          imgHeight: this.height,
        });
      };
  
      imageInstance.src = _URL.createObjectURL(image);
    }

  })

  return promise;
}

export default getImgSizes;

