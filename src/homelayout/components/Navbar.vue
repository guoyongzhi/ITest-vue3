<template>
  <div class="header-box">
    <div class="logo-section box">
      <div class="search">
        <form action="" method="post" name="searchform">
          <input name="keyboard" class="input_text" placeholder="请输入关键字词" type="text">
          <input name="Submit" class="input_submit" value="搜索" type="submit">
        </form>
      </div>
      <div class="logo">
        <router-link to="">
          <!-- <img src="../../assets/images/logo.png"> -->
          <h2 class="logo-title">Zhixin</h2>
          <p class="logo-text">智信科技，让你对手追赶</p>
        </router-link>
      </div>
    </div>
    <div class="clear" />
    <div class="top-nav">
      <el-menu class="left-menu" :default-active="activeIndex" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item style="min-width: 180px;text-align: center;"><a href="">智信科技</a></el-menu-item>
        <el-menu-item index="1" style="min-width: 90px;text-align: center;"><router-link :to="{path:'/'}">首页</router-link></el-menu-item>
        <el-menu-item index="3" style="min-width: 90px;text-align: center;"><router-link :to="{path: '/profile'}">人物简介</router-link></el-menu-item>
        <!-- <el-menu-item index="4" class="left-menu-item" style="min-width: 90px;text-align: center;">解决方案</el-menu-item> -->
        <el-menu-item index="5" class="left-menu-item" style="min-width: 90px;text-align: center;">实时新闻</el-menu-item>
        <el-menu-item index="6" class="left-menu-item" style="min-width: 90px;text-align: center;">招财纳贤</el-menu-item>
        <el-menu-item index="7" class="left-menu-item" style="min-width: 90px;text-align: center;">联系我们</el-menu-item>
        <el-menu-item index="2" class="left-menu-item" style="min-width: 90px;text-align: center;"><router-link :to="{path:'/more'}">更多</router-link></el-menu-item>
      </el-menu>
      <!-- <div class="right-menu">
        <template v-if="device!=='mobile'"> -->
      <!-- <a class="el-button" href="">登录</a>
          <a class="el-button" href="">注册</a>
        </template> -->

      <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click"> -->
      <!-- <div class="avatar-wrapper" witdh="20px">
          <img v-if="avatar" :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // components: {
  // },
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'device'
    ])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      if (keyPath === '2') {
        this.$router.push({
          path: '/more'
        })
      } else {
        this.$router.push({
          path: '/'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* { margin: 0; padding: 0 }
body { font: 15px "Microsoft YaHei", Arial, Helvetica, sans-serif; color: #000; background: #f1f1f1; }
img { border: 0; display: block }
ul, li { list-style: none; }
a { text-decoration: none; color: #000; }
a:hover { color: #218af1; text-decoration: none; }
h1 { font-size: 28px }
h2 { font-size: 18px }
h3 { font-size: 16px }
i { font-style: normal; display: block }
span { display: block }
.clear, .blank { clear: both; width: 100%; overflow: hidden; }
.blank { height: 20px }
.fl { float: left }
.fr { float: right }
/*.htitle { text-align: center; font-weight: 700; font-size: 36px; margin: 30px auto }*/
.box,.article-box { width: 1170px; margin: auto; overflow: hidden;margin-top: 10px}
.white-bg { background: #fff; border: 1px solid #eee; }
.plr20 {padding: 0 20px;}
/*.header-box*/
.header-box { margin: 0; width: 100%; z-index: 9; transition: all 0.4s; background: #fff }
.logo-section { padding: 10px 0; }
.logo { overflow: hidden }
.logo img { width: 70px; float: left; margin-right: 10px }
.logo-title { font-size: 28px; color: #1487f4; }
.logo-title a{color: #1487f4; }
.logo-text { margin-top: 5px; color: #888; }
/*search*/
.search { float: right; margin-top: 16px; border-radius: 0 5px 5px 0; width: 400px; background: linear-gradient(to right, #0062ff 0%, #00a0ec 100%); }
.search p { margin-bottom: 10px; }
.search input.input_submit { border: 0; background: url("../../assets/images/search.png") no-repeat left 10px center; color: #fff; outline: none; line-height: 36px; font-size: 18px; width: 100px; cursor: pointer; letter-spacing: 5px; text-indent: 1em; }
.search input.input_text { border: 0; line-height: 36px; height: 36px; outline: none; width: 300px; background: #f3f3f3; float: left; text-indent: 1em; }
/*top-nav*/
.top-nav { width: 100%; background: #1487f4; }
.top-nav h2 { color: #fff; position: fixed; top: 0; padding-left: 10px; font-weight: normal; height: 40px; line-height: 40px; display: none; }
.top-nav h2 a{ color: #fff;}
.top-nav:before { display: table; content: " "; }
.top-nav:after { content: "."; display: block; clear: both; visibility: hidden; line-height: 0; height: 0; }
// nav { text-align: center; line-height: 50px; width: 100%; }
// nav .star-list { margin: auto; width: 1170px; }
// .star-list li { position: relative; display: inline; float: left; font-size: 15px; margin-right: 10px; }
// .star-list li a { display: inline; float: left; padding: 0 20px; color: #fff; }
// .star-list li a:hover { background: rgb(9, 118, 220); }
// .star-list ul.sub { padding: 5px 0; position: absolute; left: 0; top: 50px; background: rgb(9, 118, 220); z-index: 9; display: none; }
// .star-list ul.sub li { height: 34px; line-height: 34px; margin-left: 0; width: 100%; font-size: 14px; }
// .star-list ul.sub li a { padding: 0; display: block; width: 100%; }
// .star-list ul.sub li a:hover { background: #1487f4; }
// .star-list li:hover ul.sub { display: block }
// .star-list ul.sub:before { content: ""; height: 15px; width: 15px; background: rgb(9, 118, 220); -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); transform: rotate(-45deg); border-left: 0; border-bottom: 0; position: absolute; top: -8px; left: 42%; }
// .m-nav-h { display: none; width: 70px; height: 40px; background: #1487f4; text-align: center; }
// .nav-icon { display: block; position: relative; width: 30px; height: 3px; background-color: #fff; margin-top: 20px; float: left; margin-left: 20px; }
// .nav-icon:before, .nav-icon:after { content: ''; display: block; width: 30px; height: 3px; position: absolute; background: #fffefe; -webkit-transition-property: margin, -webkit-transform; transition-property: margin, -webkit-transform; transition-property: margin, transform; transition-property: margin, transform, -webkit-transform; -webkit-transition-duration: 300ms; transition-duration: 300ms; }
// .nav-icon:before { margin-top: -10px; }
// .nav-icon:after { margin-top: 10px; }
// .open .nav-icon { background: none }
// .open .nav-icon:before { margin-top: 0; -webkit-transform: rotate(45deg); transform: rotate(45deg); }
// .open .nav-icon:after { margin-top: 0; -webkit-transform: rotate(-45deg); transform: rotate(-45deg); }
// .open .nav-icon:before, .open .nav-icon:after { content: ''; display: block; width: 30px; height: 3px; position: absolute; background: #fff; }
// .menu:after { content: ""; position: absolute; right: 5px; top: 24px; width: 0; height: 0; border-width: 4px 4px 0; border-style: solid; border-color: #fff transparent transparent; -ms-transition: all .5s ease; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease; }
// .menu:hover:after { transform: rotate(180deg) }
// .is-fixed { position: fixed; top: 0; box-shadow: 0px 3px 10px 1px rgba(144, 161, 180, 0.4); z-index: 99; }
// /*banner*/
// .banner-box { width: 60%; float: left; height: 340px; overflow: hidden;}

// /*headline-box*/
// .headline-box { width: 38%; float: right; }
// .headline-news { overflow: hidden; padding: 17px 31px 21px; }
// .headline-news-title { margin-bottom: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #0092d8; }
// .headline-news-title a { color: #1487f4; }
// .headline-news-title span { float: left; font-size: 12px; font-weight: normal; border: #ff6600 1px solid; padding: 0 5px; border-radius: 3px; color: #ff6600; margin: 4px 8px 0 0; }
// .headline-news-small-text { line-height: 20px; font-size: 14px; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 3; height: 60px; margin-bottom: 10px; color: #888; }
// .headline-news-list { border-top: #ddd 1px solid; padding-top: 10px; }
// .headline-news-list li { padding-left: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 30px; position: relative }
// .headline-news-list li:before { position: absolute; content: ""; width: 3px; height: 3px; background: #000; border-radius: 10px; left: 0; top: 15px; }
// /*tab*/
// .id-tab li { cursor: pointer; display: inline-block }
// .id-tab-content section { display: none; }
// .id-tab-content section:nth-child(1) { display: block }
// /*recommend-news*/
// .recommend-news { position: relative }
// .id-tab { border-bottom: #e4e3e3 1px solid; margin: 20px }
// .id-tab li { font-size: 16px; margin-right: 20px; padding: 0 10px 10px; position: relative }
// .id-tab li:after { content: ""; background: #1487f4; background: linear-gradient(to right, #0062ff 0%, #00a0ec 100%); width: 20%; height: 2px; position: absolute; bottom: -1px; left: 40%; opacity: 0; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; transition: all .5s ease; }
// .id-tab li:hover:after, #tab li.tab-current:after { opacity: 1; width: 100%; margin: auto; display: block; left: 0; }
// .id-tab li.tab-current { color: #1487f4; }
// .tab-a-more { position: absolute; right: 20px; top: 16px; }
// .tab-a-more a { display: block; background-size: 32px; overflow: hidden; width: 50px; height: 30px; }
// .id-tab-content { margin: 20px; overflow: hidden; }
// .tab-a-more a i { position: absolute; top: 16px; width: 8px; height: 8px; animation: bounce_fountainG 1.2s linear infinite; border-radius: 8px; background: #09F; }
// .tab-a-more a i:first-child { right: 20px; animation-delay: .4s; background: #09F; }
// .tab-a-more a i:nth-child(2) { right: 10px; animation-delay: .6s; background: #3c0; }
// .tab-a-more a i:nth-child(3) { right: 0; animation-delay: .8s; background: #f60; }

.navbar {
  // height: 60px;
  // overflow: hidden;
  // position: relative;
  // background: #545c64;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);

  margin: 0; width: 100%; z-index: 9; transition: all 0.4s; background: #fff;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .home-tab {
    min-width: 120px;
    text-align: center;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .left-menu {
    float: left;
    height: 100%;
    line-height: 50px;
    margin-left: 150px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 40px;
    margin-right: 200px;
    margin-left: 200px;

    &:focus {
      outline: none;
    }

    .el-button {
      display: inline-block;
      padding: 7px 7px;
      height: 50%;
      font-size: 18px;
      // color: #fff;
      vertical-align: text-bottom;
      text-align: center;
      // background: #545c64;
      // line-height: 50px;
      margin-bottom: 10px;
    }

    .left-menu-item {
      float: left;
      height: 100%;
      // display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      // color: #fff;
      vertical-align: text-bottom;
      text-align: center;
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .right-menu-item {
      display: inline-block;
      padding: 8px 9px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;
      text-align: center;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      min-width: 35px;
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
