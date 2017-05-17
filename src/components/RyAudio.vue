<template>
  <div class="ryaudio">
    <div class="ryaudio-container" :style="`width: ${width}px;`">
      <audio ref="audio" :src="audio.src">
        <p>we believe you need to upgrade your browser :)</p>
      </audio>
      <div class="ryaudio-cover" :class="{'is-paused': !isPlaying}">
        <img :src="audio.cover" :alt="audio.title">
      </div>
      <div class="ryaudio-content">
        <div class="ryauio-info">
          <div class="ryaudio-title">{{audio.title}}</div>
          <div class="ryaudio-singer">{{audio.singer}}</div>
        </div>
        <div class="ryaudio-progress">
          <span class="ryaudio-currenttime">{{currentTime}}</span>
          <div class="ryaudio-progress-bar">
            <div class="ryaudio-progress-bar-body" @click="setBackTo" ref="progress">
              <div class="ry-audio-progress-active" :style="{width: activeProgress * 100 + '%'}" @click="setBackTo"></div>
              <span class="ry-audio-progress-slider" @mousedown="handleSliderDown" :style="{left: activeProgress * 100 + '%'}"></span>
            </div>
          </div>
          <span class="ryaudio-duartion">{{duration}}</span>
        </div>
        <div class="ryaudio-controls">
          <a class="ryaudio-prev" @click="onAudioPrev">
            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <g id="Music" transform="translate(-360.000000, -496.000000)" stroke="#263238">
                        <g id="49-multimeda-back-previous" transform="translate(361.000000, 497.000000)">
                            <circle id="Layer-1" cx="15" cy="15" r="15"></circle>
                            <polygon id="Layer-2" points="9 9 9 21 12 21 12 9"></polygon>
                            <polygon id="Layer-3" points="12.6 15 21.0867187 21 21.0867187 9"></polygon>
                        </g>
                    </g>
                </g>
            </svg>
          </a>
          <a class="ryaudio-play" v-if="!isPlaying" @click="onAudioPlay">
            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <g id="Music" transform="translate(-423.000000, -496.000000)" stroke="#263238">
                        <g id="42-multimeda-play" transform="translate(424.000000, 497.000000)">
                            <circle id="Layer-1" cx="15" cy="15" r="15"></circle>
                            <polygon id="Layer-2" points="20.4867188 15 12 21 12 9"></polygon>
                        </g>
                    </g>
                </g>
            </svg>
          </a>
          <a class="ryaudio-pause" v-if="isPlaying" @click="onAudioPause">
            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <g id="Music" transform="translate(-454.000000, -598.000000)" stroke="#4A4A4A">
                        <g id="46-multimeda-pause" transform="translate(455.000000, 599.000000)">
                            <circle id="Layer-1" cx="15" cy="15" r="15"></circle>
                            <path d="M9,9 L13.5,9 L13.5,21 L9,21 L9,9 Z M16.5,9 L21,9 L21,21 L16.5,21 L16.5,9 Z" id="Layer-2"></path>
                        </g>
                    </g>
                </g>
            </svg>
          </a>
          <a class="ryaudio-next" @click="onAudioNext">
            <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <g id="Music" transform="translate(-483.000000, -497.000000)" stroke="#4A4A4A">
                        <g id="48-multimeda-next-end" transform="translate(484.000000, 498.000000)">
                            <circle id="Layer-1" cx="15" cy="15" r="15"></circle>
                            <polygon id="Layer-2" points="21 9 21 21 18 21 18 9"></polygon>
                            <polygon id="Layer-3" points="17.4867188 15 9 21 9 9"></polygon>
                        </g>
                    </g>
                </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RyAudio',
    props: {
      audio: {
        type: Object
      },
      width: {
        type: Number,
        default: 320
      },
      onPlay: {
        type: Function
      },
      onPause: {
        type: Function
      },
      onNext: {
        type: Function
      },
      onPrev: {
        type: Function
      }
    },
    data() {
      return {
        currentTime: '00:00',
        duration: '00:00',
        progressValue: 0,
        activeProgress: 0,
        isPlaying: false,
        progressMax: 0
      }
    },
    watch: {
      audio() {
        this.$nextTick(() => {
          this.$refs.audio.play()
          this.isPlaying = true
        })
      }
    },
    mounted() {
      const audioEle = this.$refs.audio

      audioEle.addEventListener('loadeddata', () => {
        this.progressMax = audioEle.duration
        this.duration = this.formatTime(audioEle.duration)
      })
      audioEle.addEventListener('timeupdate', () => {
        this.currentTime = this.formatTime(audioEle.currentTime)
        this.progressValue = audioEle.currentTime
        this.activeProgress = parseFloat(this.progressValue / this.progressMax)
      })
      audioEle.addEventListener('play', () => {
        if (!this.isPlaying) {
          this.isPlaying = true
        }
      })
      audioEle.addEventListener('pause', () => {
        if (this.isPlaying) {
          this.isPlaying = false
        }
      })
    },
    methods: {
      onAudioPlay() {
        if (this.onPlay && typeof this.onPlay === 'function') {
          this.onPlay(this.$refs.audio)
        } else {
          this.$refs.audio.play()
          this.isPlaying = true
        }
      },
      onAudioPause() {
        if (this.onPause && typeof this.onPause === 'function') {
          this.onPause(this.$refs.audio)
        } else {
          this.$refs.audio.pause()
          this.isPlaying = false
        }
      },
      onAudioNext() {
        if (this.onNext && typeof this.onNext === 'function') {
          this.onNext(this.$refs.audio)
        }
      },
      onAudioPrev() {
        if (this.onPrev && typeof this.onPrev === 'function') {
          this.onPrev(this.$refs.audio)
        }
      },
      formatTime(num) {
        const temp = parseFloat(num)
        let secs = parseInt(temp % 60)
        let mins = parseInt((temp / 60) % 60)
        secs = `0${secs}`.slice(-2)
        mins = `0${mins}`.slice(-2)
        return `${mins}:${secs}`
      },
      setBackTo(e) {
        this.setCurrentTime(e)
      },
      handleSliderDown(e) {
        this.attachDocumentEvents()
      },
      setCurrentTime(evt) {
        const x = evt.pageX
        const rect = this.$refs.progress.getBoundingClientRect()
        let diff = x - rect.left
        if (diff < 0) {
          diff = 0
        }
        if (diff > rect.width) {
          diff = rect.width
        }
        const audioEle = this.$refs.audio
        audioEle.currentTime = parseFloat(diff / rect.width) * audioEle.duration
      },
      handleMousemove(e) {
        const rect = this.$refs.progress.getBoundingClientRect()
        let x = e.pageX
        let diff = x - rect.left
        if (diff < 0) {
          diff = 0
        }
        if (diff > rect.width) {
          diff = rect.width
        }
        const audioEle = this.$refs.audio
        this.progressValue = parseFloat(diff / rect.width) * audioEle.duration
        this.activeProgress = parseFloat(this.progressValue / this.progressMax)
        audioEle.currentTime = this.progressValue
      },
      handleMouseup(e) {
        document.removeEventListener('mousemove', this.handleMousemove, false)
      },
      attachDocumentEvents() {
        document.addEventListener('mousemove', this.handleMousemove, false)
        document.addEventListener('mouseup', this.handleMouseup, false)
      }
    }
  }
</script>

<style lang="scss" scoped>
.ryaudio-container {
  display: flex;
  align-items: center;
}
@-webkit-keyframes spinAroundA {
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}

@keyframes spinAroundA {
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}
.ryaudio-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 240px;
  background-image: url('../assets/audio-bg.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: transform 1s;
  animation: spinAroundA 10s linear infinite forwards;
  animation-play-state: running;
  &.is-paused {
    animation-play-state: paused
  }
  img {
    display: block;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
}
.ryaudio-content {
  flex: 1 1;
  margin-left: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.ryauio-info {
  margin-bottom: 40px;
}
.ryaudio-title {
  font-size: 24px;
  font-weight: 400;
}
.ryaudio-singer {
  font-size: 15px;
  color: rgba(0,0,0,0.5);
  margin-top: 5px;
  font-weight: 300;
  font-style: italic;
}
.ryaudio-progress {
  display: flex;
  align-items: center;
}
.ryaudio-currenttime, .ryaudio-duartion {
  font-size: 12px;
  color: rgba(0,0,0,0.5);
  display: block;
  width: 40px;
}
.ryaudio-progress-bar {
  flex: 1 1;
  padding-left: 15px;
  padding-right: 15px;
  height: 20px;
  display: flex;
  align-items: center;
}
.ryaudio-progress-bar-body {
  flex: 1 1;
  position: relative;
  z-index: 1000;
  height: 1px;
  background-color: rgba(0,0,0,0.15);
  cursor: pointer;
}
.ry-audio-progress-active {
  position: absolute;
  left: 0;
  top: 0;
  height: 1px;
  background-color: #4a4a4a;
  z-index: 1100;
}
.ry-audio-progress-slider {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  display: block;
  border-radius: 50%;
  background-color: #4a4a4a;
  margin-top: -1px;
  z-index: 1200;
}
.ryaudio-controls {
  display: flex;
  align-items: center;
  margin-top: 40px;
  a {
    display: block;
    width: 32px;
    height: 32px;
    margin-right: 20px;
    cursor: pointer;
    &:hover {
      svg g {
        stroke: #4a4a4a;
      }
    }
    svg g {
      stroke: rgba(0,0,0,0.44);
    }
  }
}
@media (max-width:640px) {
  .ryaudio-container {
    width: 100% !important;
    display: block;
  }
  .ryaudio-cover {
    margin: 0 auto;
  }
  .ryaudio-content {
    display: block;
    margin-left: 0;
    padding: 10px;
  }
  .ryauio-info {
    text-align: center;
    margin-bottom: 20px;
  }
  .ryaudio-controls {
    margin-top: 20px;
    justify-content: center;
  }
  .ryaudio-controls a.ryaudio-next {
    margin-right: 0;
  }
  .ry-audio-progress-slider {
    margin-top: 0;
  }
}
</style>
