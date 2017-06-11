<template>
  <div class="MyAudio">
    <div class="MyAudio-container" :style="`width: ${width}px;`">
      <audio ref="myaudio" :src="myaudio.src">
        <p>we believe you need to upgrade your browser :)</p>
      </audio>
      <div class="MyAudio-cover" :class="{'is-paused': !isPlaying}" >
        <img :src="myaudio.cover" :alt="myaudio.title" >
      </div>
      <div class="MyAudio-controls">

        <a class="MyAudio-play" v-if="!isPlaying" @click="onMyAudioPlay">
          <svg width="80px" height="80px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                  <g id="Music" transform="translate(-423.000000, -496.000000)" stroke="#263238">
                      <g id="42-multimeda-play" transform="translate(424.000000, 497.000000)">
                          <!-- <circle id="Layer-1" cx="15" cy="15" r="15"></circle> -->
                          <polygon id="Layer-2" points="20.4867188 15 12 21 12 9"></polygon>
                      </g>
                  </g>
              </g>
          </svg>
        </a>
        <a class="MyAudio-pause" v-if="isPlaying" @click="onMyAudioPause">
          <svg width="80px" height="80px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                  <g id="Music" transform="translate(-454.000000, -598.000000)" stroke="#4A4A4A">
                      <g id="46-multimeda-pause" transform="translate(455.000000, 599.000000)">
                          <!-- <circle id="Layer-1" cx="15" cy="15" r="15"></circle> -->
                          <path d="M9,9 L13.5,9 L13.5,21 L9,21 L9,9 Z M16.5,9 L21,9 L21,21 L16.5,21 L16.5,9 Z" id="Layer-2"></path>
                      </g>
                  </g>
              </g>
          </svg>
        </a>

      </div>
      <div class="MyAudio-content">
        <div class="MyAudio-info">
          <span class="MyAudio-title">{{myaudio.title}}-</span>
          <span class="MyAudio-singer">{{myaudio.singer}}</span>
        </div>
        <div class="MyAudio-progress">
          <!-- <span class="MyAudio-currenttime">{{currentTime}}</span> -->
          <div class="MyAudio-progress-bar">
            <div class="MyAudio-progress-bar-body" @click="setBackTo" ref="progress">
              <div class="MyAudio-progress-active" :style="{width: activeProgress * 100 + '%'}" @click="setBackTo"></div>
              <span class="MyAudio-progress-slider" @mousedown="handleSliderDown" :style="{left: activeProgress * 100 + '%'}"></span>
            </div>
          </div>
          <span class="MyAudio-duartion">{{currentTime}}/{{duration}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyAudio',
    props: {
      myaudio: {
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
      myaudio() {
        this.$nextTick(() => {
          this.$refs.myaudio.play()
          this.isPlaying = true
        })
      }
    },
    mounted() {
      const MyAudioEle = this.$refs.myaudio
      // console.log(this.$refs.myaudio)

      MyAudioEle.addEventListener('loadeddata', () => {
        this.progressMax = MyAudioEle.duration
        this.duration = this.formatTime(MyAudioEle.duration)
      })
      MyAudioEle.addEventListener('timeupdate', () => {
        this.currentTime = this.formatTime(MyAudioEle.currentTime)
        this.progressValue = MyAudioEle.currentTime
        this.activeProgress = parseFloat(this.progressValue / this.progressMax)
      })
      MyAudioEle.addEventListener('play', () => {
        if (!this.isPlaying) {
          this.isPlaying = true
        }
      })
      MyAudioEle.addEventListener('pause', () => {
        if (this.isPlaying) {
          this.isPlaying = false
        }
      })
    },
    methods: {
      onMyAudioPlay() {
        if (this.onPlay && typeof this.onPlay === 'function') {
          this.onPlay(this.$refs.myaudio)
        } else {
          this.$refs.myaudio.play()
          this.isPlaying = true
        }
      },
      onMyAudioPause() {
        if (this.onPause && typeof this.onPause === 'function') {
          this.onPause(this.$refs.myaudio)
        } else {
          this.$refs.myaudio.pause()
          this.isPlaying = false
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
        const MyAudioEle = this.$refs.myaudio
        MyAudioEle.currentTime = parseFloat(diff / rect.width) * MyAudioEle.duration
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
        const MyAudioEle = this.$refs.myaudio
        this.progressValue = parseFloat(diff / rect.width) * MyAudioEle.duration
        this.activeProgress = parseFloat(this.progressValue / this.progressMax)
        MyAudioEle.currentTime = this.progressValue
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
.MyAudio-container {
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
.MyAudio-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 240px;
  background-image: url('../assets/MyAudio-bg.svg');
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
    // cursor: pointer;
  }
}
.MyAudio-content {
  flex: 1 1;
  margin-left: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
}
.MyAudio-info {
  margin-bottom: 40px;
}
.MyAudio-title {
  font-size: 24px;
  font-weight: 400;
}
.MyAudio-singer {
  font-size: 20px;
  // color: rgba(0,0,0,0.5);
  margin-top: 5px;
  font-weight: 400;
  // font-style: italic;
}
.MyAudio-progress {
  display: flex;
  align-items: center;
}
.MyAudio-currenttime, .MyAudio-duartion {
  font-size: 12px;
  color: rgba(0,0,0,0.5);
  display: block;
  width: 80px;
}
.MyAudio-progress-bar {
  flex: 1 1;
  // padding-left: 15px;
  padding-right: 15px;
  height: 20px;
  display: flex;
  align-items: center;
}
.MyAudio-progress-bar-body {
  flex: 1 1;
  position: relative;
  z-index: 1000;
  height: 1px;
  background-color: rgba(0,0,0,0.15);
  cursor: pointer;
}
.MyAudio-progress-active {
  position: absolute;
  left: 0;
  top: 0;
  height: 1px;
  background-color: #4a4a4a;
  z-index: 1100;
}
.MyAudio-progress-slider {
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
.MyAudio-controls {

  position:absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-top: 40px;
  margin-left:38px;
  width: 166px;
  height: 166px;
  cursor: pointer;
  &:hover {
  a svg g {
      stroke: rgba(0,0,0,0.44);
    }
  }
  a {
    display: block;
    svg g {
      stroke: rgba(0,0,0,0);
    }
  }
}
@media (max-width:640px) {
  .MyAudio-container {
    width: 100% !important;
    display: block;
  }
  .MyAudio-cover {
    margin: 0 auto;
  }
  .MyAudio-content {
    display: block;
    margin-left: 0;
    padding: 10px;
  }
  .MyAudio-info {
    text-align: center;
    margin-bottom: 20px;
  }
  .MyAudio-controls {
    margin-top: 20px;
    justify-content: center;
  }
  .MyAudio-controls a.MyAudio-next {
    margin-right: 0;
  }
  .MyAudio-progress-slider {
    margin-top: 0;
  }
}
</style>
