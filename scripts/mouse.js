'use strict';
import '../styles/mouseStyle.css';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const audioElement = document.querySelector('.audio-source');

// 소리의 세기 표현
// const gainNode = audioContext.createGain();

// Stero panner 소리의 좌우측 균형 변경해주기
const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);
const pannerControl = document.querySelector('.panner');

// audioElement에서 셀렉한 오디오 DOM을 track에 할당해준다.
const track = audioContext.createMediaElementSource(audioElement);
track.connect(panner).connect(audioContext.destination);

const btnContainer = document.querySelector('.btn-container');
const playBtn = document.querySelector('.btn');
const playBtnText = document.querySelector('.btn-text');
const video = document.querySelector('.btn-container__video');
const mainLink = document.querySelector('.go-main');

playBtn.addEventListener(
  'click',
  function () {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    // DOM의 property을 this로 연결할 수 있다.
    if (this.dataset.playing === 'false') {
      audioElement.play();
      this.dataset.playing = 'true';
      btnContainer.classList.add('btn-grow');
      btnContainer.classList.remove('btn-reduce');
      pannerControl.classList.remove('hidden');
      pannerControl.classList.add('reveal');
      playBtnText.classList.add('btn-shaking');
      mainLink.style.color = '#ffffff';
    } else if (this.dataset.playing === 'true') {
      audioElement.pause();
      this.dataset.playing = 'false';
      btnContainer.classList.remove('btn-grow');
      btnContainer.classList.add('btn-reduce');
      pannerControl.classList.add('hidden');
      pannerControl.classList.remove('reveal');
      playBtnText.classList.remove('btn-shaking');
      mainLink.style.color = '#000000';

      //video style 원래대로
      video.style.left = 0;
      video.style.right = 0;
      pannerControl.value = 0;
    }
  },
  false
);

audioElement.addEventListener(
  'ended',
  () => {
    playBtn.dataset.playing = 'false';
  },
  false
);

// Panner
pannerControl.addEventListener(
  'input',
  function () {
    panner.pan.value = this.value;
    if (this.value < 0) {
      video.style.left = `${Math.abs(this.value) * 50}%`;
      console.log(video.style.left);
    } else if (this.value > 0) {
      video.style.right = `${Math.abs(this.value) * 50}%`;
    }
  },
  false
);
