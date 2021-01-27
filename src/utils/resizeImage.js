export default (base64Str, cb) => {
  var img = new Image();
  img.src = base64Str;
  let resizedImage = '';

  img.onload = () => {
    var canvas = document.createElement('canvas');
    var MAX_WIDTH = 356;
    var MAX_HEIGHT = 200;
    var width = img.width;
    var height = img.height;

    if (width > MAX_WIDTH) {
      height *= MAX_WIDTH / width;
      width = MAX_WIDTH;
    } else if (height > MAX_HEIGHT) {
      width *= MAX_HEIGHT / height;
      height = MAX_HEIGHT;
    }
    
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    resizedImage = canvas.toDataURL();

    cb(resizedImage);
  }
}