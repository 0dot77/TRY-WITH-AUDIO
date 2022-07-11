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

const playBtn = document.querySelector('.btn');
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
      playBtn.classList.add('btn-grow');
      playBtn.classList.remove('btn-reduce');
      pannerControl.classList.remove('hidden');
      pannerControl.classList.add('reveal');
    } else if (this.dataset.playing === 'true') {
      audioElement.pause();
      this.dataset.playing = 'false';
      playBtn.classList.remove('btn-grow');
      playBtn.classList.add('btn-reduce');
      pannerControl.classList.add('hidden');
      pannerControl.classList.remove('reveal');
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
  },
  false
);
