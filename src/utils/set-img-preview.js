const setImgPreview = (input, callback) => {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    let $this = this;

    reader.onload = function (e) {
      callback(e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

export default setImgPreview;