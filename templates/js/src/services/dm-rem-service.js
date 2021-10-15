let defaultFontSize = 16;
const defaultDesignWidth = 1920;
const minWidth = 1280;
const rem2px = 100;

const getDefaultFontSize = () => {
  const div = window.document.createElement('div');
  div.style.width = '1rem';
  div.style.display = 'none';
  const head = window.document.getElementsByTagName('head')[0];
  head.appendChild(div);
  const htmlFontSize = parseFloat(
    window.getComputedStyle(div).getPropertyValue('width'),
  );
  div.remove();

  return htmlFontSize;
};

defaultFontSize = getDefaultFontSize();

const setRem = () => {
  const head = window.document.getElementsByTagName('head')[0];

  // if screen width is smaller than `minWidth`, treat as `minWidth`.
  const portraitWidth =
    window.innerWidth < minWidth ? minWidth : window.innerWidth;
  const fontSize =
    (portraitWidth / (defaultDesignWidth / rem2px) / defaultFontSize) * 100 +
    '%';
  const fontSizeRatio =
    portraitWidth / (defaultDesignWidth / rem2px) / defaultFontSize;

  const htmlFontSize = `
  html {
    font-size: ${fontSize} !important;
  }
  `;

  // avoid that `body` inherit the new font-size of html
  const bodyFontSize = `
  body {
    font-size: ${defaultFontSize}px;
  }
  `;

  if (document.getElementById('__rem-style__')) {
    document.getElementById('__rem-style__').innerHTML =
      htmlFontSize + bodyFontSize;
  } else {
    const style =
      document.getElementById('__rem-style__') ||
      document.createElement('style');
    style.setAttribute('id', '__rem-style__');
    style.innerHTML = htmlFontSize + bodyFontSize;

    // use `insertBefore` to avoid to overwrite style of `body`
    head.insertBefore(style, head.firstChild);
  }

  return fontSizeRatio;
};

const getRealRem2px = () => {
  const portraitWidth =
    window.innerWidth < minWidth ? minWidth : window.innerWidth;
  return (rem2px * portraitWidth) / defaultDesignWidth;
};

const DMRemService = {
  getRealRem2px,
  setRem,
};

export { DMRemService };
