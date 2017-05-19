<template>
  <footer class="footer">
    <div class="group">
      <div class="group-title">
        <a href="http://weibo.com/u/3871117106" target="_blank">Weibo</a>
      </div>
      <!-- <div class="group-link">
        <a href="http://weibo.com/u/3871117106">WeiBo</a>
        <a href="https://www.instagram.com/nicholas_xue">Instagram</a> -->
      </div>
    </div>
    <div class="group">
      <div class="group-title">
        <a href="https://karsa737.lofter.com" target="_blank">Lofter</a>
      </div>
      <!-- <div class="group-link">
        <router-link to="/music">Music</router-link>
      </div> -->
    </div>
    <div class="group">
      <div class="group-title">
        <a href="https://github.com/hejin737" target="_blank">Github</a>
      </div>
      <!-- <div class="group-link">
        <a href="https://github.com/hejin737">Github</a>
      </div> -->
    </div>
  </footer>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .group {
    width: 150px;
    text-align: center;
    align-content: center;
  }
  .group-title {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 15px;
    a {
      display: block;
      margin-bottom: 10px;
      color: #4a4a4a;
      // font-size: 13px;
      text-decoration: none;
      // color: rgba(0,0,0,0.44);
      &:hover {
        // text-decoration: underline;
        color: #4a4a4a;
      }
    }
  }
  .group-link {

  }
</style>
