<template>
  <div class="musics">
    <div class="music-player" v-if="currentMusic">
      <ry-audio ref="ryAudio" :audio="currentMusic" :width="width" :on-prev="handlePrev" :on-next="handleNext"></ry-audio>
    </div>
    <div class="music-list">
      <div class="music-item" v-for="(item, index) in musics" :key="item.id" @click="changeMusic(item, index)">
        <div class="music-cover">
          <img :src="cropImage(item.cover, 220, 220)" :alt="item.title">
        </div>
        <div class="music-info">
          <div class="music-title">{{item.title}}</div>
          <div class="music-singer">{{item.singer}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import RyAudio from '../components/RyAudio.vue'
  import data from '../data.js'
  import { cropImage } from '../utils'
  import { mapState } from 'vuex'

  export default {
    name: 'NMusic',
    components: {
      RyAudio
    },
    data() {
      return {
        musics: data.musics,
        width: 800
      }
    },
    created() {
      this.$store.dispatch('setMusic', data.musics[0])
      this.$store.dispatch('setIndex', 0)
    },
    computed: mapState({
      currentMusic: state => state.music.music,
      currentIndex: state => state.music.currentIndex
    }),
    methods: {
      cropImage,
      changeMusic(item, index) {
        this.$store.dispatch('setMusic', item)
        this.$store.dispatch('setIndex', index)
      },
      handleNext(audioEle) {
        const len = this.musics.length
        const temp = this.currentIndex + 1
        if (temp < len) {
          this.$store.dispatch('setMusic', data.musics[temp])
          this.$store.dispatch('setIndex', temp)
        } else {
          this.$store.dispatch('setMusic', data.musics[0])
          this.$store.dispatch('setIndex', 0)
        }
      },
      handlePrev(audioEle) {
        const len = this.musics.length
        const temp = this.currentIndex - 1
        if (temp < 0) {
          this.$store.dispatch('setMusic', data.musics[len - 1])
          this.$store.dispatch('setIndex', len - 1)
        } else {
          this.$store.dispatch('setMusic', data.musics[temp])
          this.$store.dispatch('setIndex', temp)
        }
      }
    }
  }
</script>


<style lang="scss">
.musics {
  margin-top: 80px;
  margin-bottom: 80px;
  // width:80%;
}
.music-player {
  display: flex;
  justify-content: center;
}
.music-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 80px;
}
.music-item {
  width: 180px;
  margin-bottom: 30px;
  margin-right: 20px;
  cursor: pointer;
  &:nth-child(4n) {
    margin-right: 0;
  }
}
.music-cover {
  img {
    display: block;
    width: 100%;
    border-radius: 5px;
  }
}
.music-info {
  margin-top: 10px;
}
.music-title {
  font-size: 15px;
  font-weight: 500;
}
.music-singer {
  font-size: 12px;
  margin-top: 5px;
  font-style: italic;
  color: rgba(0,0,0,0.44);
}
</style>
