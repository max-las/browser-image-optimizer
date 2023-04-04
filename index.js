const browser = () => {
  if((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) != -1 ) 
  {
    return 'Opera';
  }
  else if(navigator.userAgent.indexOf('Edg') != -1 )
  {
    return 'Edge';
  }
  else if(navigator.userAgent.indexOf('Chrome') != -1 )
  {
    return 'Chrome';
  }
  else if(navigator.userAgent.indexOf('Safari') != -1)
  {
    return 'Safari';
  }
  else if(navigator.userAgent.indexOf('Firefox') != -1 ) 
  {
    return 'Firefox';
  }
  else if((navigator.userAgent.indexOf('MSIE') != -1 ) || (!!document.documentMode == true )) //IF IE > 10
  {
    return 'IE'; 
  }  
  else 
  {
    return 'unknown';
  }
};

const supportedTypes = ['image/jpeg', 'image/png'];
const outputFormat = {
  extension: 'jpg',
  mime: 'image/jpeg'
};

export const optimizeImage = (file) => new Promise((resolve, _reject) => {
  const indexOfExtension = file.name.lastIndexOf('.');
  if (!supportedTypes.includes(file.type) || indexOfExtension < 0) {
    resolve(file);
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const imgBefore = new Image();

  let quality;
  switch (browser()) {
    case 'Safari':
      quality = 0.55;
      break;
    default:
      quality = 0.80;
  }

  imgBefore.onload = function() {
    const ratio = this.width / this.height;
    let heightAfter, widthAfter;
    if (this.height < this.width) {
      heightAfter = 1500;
      widthAfter = 1500 * ratio;
    } else {
      widthAfter = 1500;
      heightAfter = 1500 / ratio;
    }
    canvas.width = widthAfter;
    canvas.height = heightAfter;
    ctx.drawImage(imgBefore, 0, 0, widthAfter, heightAfter);
    canvas.toBlob((blob) => {
      const filename = file.name.slice(0, indexOfExtension + 1) + outputFormat.extension;
      const result = new File([blob], filename, { type: outputFormat.mime });
      resolve(result);
    }, outputFormat.mime, quality);
  };

  imgBefore.src = URL.createObjectURL(file);
});
