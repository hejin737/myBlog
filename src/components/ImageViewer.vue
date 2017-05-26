<template>
  <transition name="fadeIn">
    <div class="image-viewer" v-if="show">
      <a class="image-viewer-close" @click="closeViewer">
        <svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="100-Basic-Element-Icons-Dark" transform="translate(-1074.000000, -337.000000)" fill="#4A4A4A">
                    <path d="M1074.51635,386.483649 C1074.86059,386.827883 1075.29088,387 1075.7642,387 C1076.23752,387 1076.66781,386.827883 1077.01205,386.483649 L1099,364.495697 L1120.98795,386.483649 C1121.33219,386.827883 1121.76248,387 1122.2358,387 C1122.66609,387 1123.13941,386.827883 1123.48365,386.483649 C1124.17212,385.795181 1124.17212,384.67642 1123.48365,383.987952 L1101.4957,362 L1123.48365,340.012048 C1124.17212,339.32358 1124.17212,338.204819 1123.48365,337.516351 C1122.79518,336.827883 1121.67642,336.827883 1120.98795,337.516351 L1099,359.504303 L1077.01205,337.516351 C1076.32358,336.827883 1075.20482,336.827883 1074.51635,337.516351 C1073.82788,338.204819 1073.82788,339.32358 1074.51635,340.012048 L1096.5043,362 L1074.51635,383.987952 C1073.82788,384.67642 1073.82788,385.795181 1074.51635,386.483649 L1074.51635,386.483649 Z" id="cancel"></path>
                </g>
            </g>
        </svg>
      </a>
      <div class="image-viewer-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide image-viewer-slide" v-for="item in images" :key="item.id">
            <img :src="cropImage(item.url, 640, 640)" :alt="item.id">
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Swiper from 'swiper'
  import { cropImage } from '../utils'

  export default {
    name: 'ImageViewer',
    props: ['images', 'activeIndex', 'show', 'onClose'],
    watch: {
      show(val) {
        const vm = this
        if (val) {
          this.$nextTick(() => {
            new Swiper('.image-viewer-container', {
              initialSlide: vm.activeIndex,
              slidesPerView: 'auto',
              centeredSlides: true,
              spaceBetween: 0,
              keyboardControl: true,
              mousewheelControl: true,
              loop: true
            })
          })
        }
      }
    },
    methods: {
      cropImage,
      closeViewer() {
        this.onClose()
      }
    }
  }
</script>

<style lang="scss">
.swiper-wrapper{
  display: -webkit-inline-box;
  height: 100%;
}
.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,255,255,0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fadeIn-enter {
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;
}
.image-viewer-container {
  width: 500px;
  height: 800px;
  // margin: 0 auto;
}
.image-viewer-slide {
  // height:100%;
  display: flex;
  align-items: center;
  margin-left: 8px;
  margin-right: 8px;
  img {
    max-width: 100%;
  }
}
.image-viewer-close {
  position: absolute;
  top: 30px;
  right: 50px;
  cursor: pointer;
  z-index: 3000;
  svg {
    width: 30px;
    height: 30px;
  }
}

</style>
