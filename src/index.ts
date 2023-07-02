import { Browser, detectBrowser } from './browser';

const supportedTypes = ['image/jpeg', 'image/png'];
const outputFormat = {
  extension: 'jpg',
  mime: 'image/jpeg'
};

export const optimizeImage = (file: File) => new Promise((resolve) => {
  const indexOfExtension = file.name.lastIndexOf('.');
  if (!supportedTypes.includes(file.type) || indexOfExtension < 0) {
    resolve(file);
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const imgBefore = new Image();

  let quality: number;
  switch (detectBrowser()) {
  case Browser.Safari:
    quality = 0.55;
    break;
  default:
    quality = 0.80;
  }

  imgBefore.addEventListener('load', () => {
    const ratio = imgBefore.width / imgBefore.height;
    let heightAfter, widthAfter;
    if (imgBefore.height < imgBefore.width) {
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
      blob = blob as Blob;
      const filename = file.name.slice(0, indexOfExtension + 1) + outputFormat.extension;
      const result = new File([blob], filename, { type: outputFormat.mime });
      resolve(result);
    }, outputFormat.mime, quality);
  });

  imgBefore.src = URL.createObjectURL(file);
});
