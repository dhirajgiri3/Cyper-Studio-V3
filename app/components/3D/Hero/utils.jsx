import imagesLoaded from 'imagesloaded';

export const preloadImages = (selector = 'img') => {
  return new Promise((resolve) => {
    imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
  });
};

export const lerp = (a, b, n) => (1 - n) * a + n * b;

export const getPointerPos = (ev) => {
  let posx = 0;
  let posy = 0;

  if (ev.touches) {
    if (ev.touches.length > 0) {
      posx = ev.touches[0].pageX;
      posy = ev.touches[0].pageY;
    }
  } else if (ev.pageX || ev.pageY) {
    posx = ev.pageX;
    posy = ev.pageY;
  } else if (ev.clientX || ev.clientY) {
    posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return { x: posx, y: posy };
};

export const getMouseDistance = (mousePos, lastMousePos) => {
  return Math.hypot(mousePos.x - lastMousePos.x, mousePos.y - lastMousePos.y);
};
