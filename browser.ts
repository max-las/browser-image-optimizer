export enum Browser {
  Chrome,
  Edge,
  Firefox,
  IE,
  Opera,
  Safari,
  unknown
}

export const detectBrowser = (): Browser => {
  if((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) != -1 ) 
  {
    return Browser.Opera;
  }
  else if(navigator.userAgent.indexOf('Edg') != -1 )
  {
    return Browser.Edge;
  }
  else if(navigator.userAgent.indexOf('Chrome') != -1 )
  {
    return Browser.Chrome;
  }
  else if(navigator.userAgent.indexOf('Safari') != -1)
  {
    return Browser.Safari;
  }
  else if(navigator.userAgent.indexOf('Firefox') != -1 ) 
  {
    return Browser.Firefox;
  }
  else if(navigator.userAgent.indexOf('MSIE') != -1 )
  {
    return Browser.IE; 
  }  
  else 
  {
    return Browser.unknown;
  }
};
