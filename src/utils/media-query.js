const mediaQuery = (breakpoint, userSettings) => {
  var defaultSettings = {
    'Up' : () => {}, 
    'Down' : () => {}
  }
  // var settings = $.extend(defaultSettings, (userSettings || {}));
  var settings = userSettings;
  var mediaQueryList = window.matchMedia("(min-width: " + breakpoint + " )");


  function handleOrientationChange(mql) {
    if (mql.matches) settings.Up() 
    else settings.Down();
  }

  mediaQueryList.addListener(handleOrientationChange);
  handleOrientationChange(mediaQueryList);
}

export default mediaQuery;