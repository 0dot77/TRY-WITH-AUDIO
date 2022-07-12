import '../styles/style.css';

const audioWithMouse = document.querySelector('.try-1');
const audioWithMouseVideo = document.querySelector('.try-1__video');

audioWithMouse.addEventListener(
  'mouseenter',
  () => {
    audioWithMouseVideo.classList.remove('hidden');
  },
  false
);

audioWithMouse.addEventListener(
  'mouseleave',
  () => {
    audioWithMouseVideo.classList.add('hidden');
  },
  false
);
