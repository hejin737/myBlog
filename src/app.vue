<template>
<div>
    <div>

        <!-- <router-link to="/about">about</router-link> -->
    </div>
    <div class="white-container">
        <v-header></v-header>
        <router-view></router-view>
        <v-footer></v-footer>
    </div>
</div>
</template>
<script>
 import vHeader from './common/Header.vue';
 import vFooter from './common/Footer.vue';
 export default {
        components:{
             vHeader,
             vFooter
        }
    }
</script>
<style lang="css">
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -moz-font-feature-settings: "liga" on;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: 0;
    color: #4a4a4a;
    background-color: #fafafa;
    word-break: break-all;
}
.white-container{
    display: flex;
    flex-direction: column;
    width: 940px;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 50px;
  /*width:70%;
  margin:auto;*/
  /*position: absolute;
  top: 0px;
  bottom:0;*/
  /*margin-top: 30px;*/
  background-color: white;
  /*height:100%;*/
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
}

.content{
    background: none repeat scroll 0 0 #f5f5f5;
    position: absolute;
    left: 250px;
    right: 0;
    /*top: 70px;*/
    bottom:0;*/
    /*height: 100%;
    width: auto;
    /*padding:40px;*/
    box-sizing: border-box;
    overflow-y: hidden;
}

</style>
