<template>
  <div>
    <div class="photos">
      <!-- <waterfall :line-gap="200" :watch="items">
        <waterfall-slot
          v-for="(item, index) in photos"
          :width="300"
          :height="300"
          :order="index"
          :key="item.id"
        >
          <img :src="cropImage(item.url, 100, 200)" alt="photography">
        </waterfall-slot>
      </waterfall> -->
      <div class="photo-item" v-for="(item, index) in photos" :key="item.id" @click="showViewer(index)">
        <img :src="cropImage(item.url, 250, 250)" alt="photography">
      </div>
    </div>
    <image-viewer :show="isShowViewer" :images="photos" :active-index="activeIndex" :on-close="handleClose"></image-viewer>
  </div>
</template>

<script>
// var Waterfall = require('vue-waterfall')
// import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import data from '../data'
  import { cropImage, blurryImageCrop } from '../utils'
  import ImageViewer from '../components/ImageViewer.vue'
  export default {
    components: {
      ImageViewer,
    },
    data() {
      return {
        photos: data.photos,
        isShowViewer: false,
        activeIndex: 0
      }
    },
    methods: {
      cropImage,
      blurryImageCrop,
      showViewer(index) {
        this.isShowViewer = true
        this.activeIndex = index
      },
      handleClose() {
        this.isShowViewer = false
      }
    }
  }
</script>
<style lang="scss">
.photos {
  margin-top: 80px;
  margin-bottom: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.photo-item {
  width: 250px;
  height: 250px;
  background-color: #fff;
  margin-bottom: 20px;
  cursor: zoom-in;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-left: 20px;
  margin-right: 20px;

  img {
    display: block;
    width: 100%;
  }
}
</style>
