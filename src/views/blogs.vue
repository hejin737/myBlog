<template >
<div class="blog-container">
  <div class="category">
    <div class="bgroup">
        <hr width="33%" color='grey' SIZE=2 />
        <div class="bgroup-title">
            个人博客
        </div>
        <hr width="33%" color='grey' SIZE=2 />
    </div>
    <div class="bgroup">
        <div class="bgroup-link">
            <a href="http://www.zhangxinxu.com/wordpress/">张鑫旭</a>
            <a href="http://www.ruanyifeng.com/blog/">阮一峰</a>
            <a href="http://sentsin.com/all/">闲心</a>
            <a href="http://www.liaoxuefeng.com/">廖雪峰</a>
            <a href="http://www.xuanfengge.com/">轩枫阁</a>
            <a href="http://pinggod.com/archives/">pinggod</a>
            <!-- <a href="https://www.facebook.com/a.chef.salad">Facebook</a>
        <a href="https://www.instagram.com/nicholas_xue">Instagram</a> -->
        </div>
    </div>
    </div>
    <div class="category">
      <div class="bgroup">
          <hr width="33%" color='grey' SIZE=2 />
          <div class="bgroup-title">
              社区
          </div>
          <hr width="33%" color='grey' SIZE=2 />
      </div>
      <div class="bgroup">
          <div class="bgroup-link">
              <a href="https://www.awesomes.cn/">Awesomes</a>
              <a href="http://gold.xitu.io/">掘金</a>
              <a href="http://www.w3cplus.com/">segmentfault</a>
              <a href="http://www.w3cplus.com/">w3cplus</a>
              <a href="https://www.qianduan.net/">前端观察</a>
              <a href="http://www.css88.com/">WEB前端开发</a>
              <!-- <a href="https://www.facebook.com/a.chef.salad">Facebook</a>
          <a href="https://www.instagram.com/nicholas_xue">Instagram</a> -->
          </div>
      </div>
  </div>
  <div class="category">
    <div class="bgroup">
        <hr width="33%" color='grey' SIZE=2 />
        <div class="bgroup-title">
            资源
        </div>
        <hr width="33%" color='grey' SIZE=2 />
    </div>
    <div class="bgroup">
        <div class="bgroup-link">
            <a href="http://iconfont.cn/">阿里图标库</a>
            <a href="http://ionicons.com/">Ionicons</a>
            <a href="http://zhongguose.com/">中国色</a>
            <a href="http://colorhunt.co/">Color Hunt</a>
            <a href="https://pixabay.com/zh/">Pixabay</a>
            <a href="http://coverbox.sinaapp.com/">CoverBox</a>
            <!-- <a href="https://www.facebook.com/a.chef.salad">Facebook</a>
        <a href="https://www.instagram.com/nicholas_xue">Instagram</a> -->
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.blog-container
{
    margin-top: 50px;
    margin-bottom: 150px;
    display: flex;
    // justify-content: center;
    // align-items: center;
   flex-direction: column;
}
.category{
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
}
.bgroup {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 70%;
}
.bgroup-title {
    font-size: 15px;
    font-weight: 500;
    margin-top: 10px;
    margin-bottom: 15px;
}
.bgroup-link {
    a {
        // display: block;
        margin:15px;
        // margin-bottom: 10px;
        font-size: 14px;
        text-decoration: none;
        color: rgba(0,0,0,0.44);
        &:hover {
            text-decoration: underline;
            color: #4a4a4a;
        }
    }
}
</style>
</style>
