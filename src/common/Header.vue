<template>
  <div class="header-container">
    <div class="moto">
      不会搞艺术的程序员不是好设计师
    </div>
    <div class="tabs">
      <router-link to="/resume" >PHOTO</router-link>
      <router-link to="/music" >MUSIC</router-link>
      <router-link to="/blogs" >LINKS</router-link>
    </div>
      <!-- <router-link to="/about">about</router-link> -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.header-container {
  /*background-color: red;*/
}
.moto {
  margin-top: 30px;
  font-size: 30px;
  line-height: 44px;
  letter-spacing: 0.05em;
  font-weight: 300;
  color: rgba(0,0,0,0.44);
  text-align: center;
}
.tabs {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      display: block;
      padding: 7px 18px;
      // border: 1px solid rgba(0,0,0,0.44);
      // border-radius: 20px;
      margin-left: 10px;
      margin-right: 10px;
      font-size: 14px;
      color: rgba(0,0,0,0.44);
      text-decoration: none;
      &:hover, &.router-link-active {
        color: #4a4a4a;
        border-color: #4a4a4a;
      }
    }
}
// .links {
//   display: block;
//   padding: 7px 18px;
//   border: 1px solid rgba(0,0,0,0.44);
//   border-radius: 20px;
//   margin-left: 8px;
//   margin-right: 8px;
//   font-size: 13px;
//   color: rgba(0,0,0,0.44);
// }
</style>
