<template>
  <div class="navbar">
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <sidebar class="sidebar-container" /> -->
    <el-menu class="left-menu" :default-active="activeIndex" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item style="min-width: 180px;text-align: center;"><a href="">智信科技</a></el-menu-item>
      <el-menu-item index="1" class="home-tab"><router-link :to="{path:'/'}">首页</router-link></el-menu-item>
      <el-menu-item index="3" class="home-tab">人物简介</el-menu-item>
      <el-menu-item index="4" class="home-tab">解决方案</el-menu-item>
      <el-menu-item index="5" class="home-tab">实时新闻</el-menu-item>
      <el-menu-item index="6" class="home-tab">招财纳贤</el-menu-item>
      <el-menu-item index="7" class="home-tab">联系我们</el-menu-item>
      <el-menu-item index="2" class="home-tab"><router-link :to="{path:'/more'}">更多</router-link></el-menu-item>
    </el-menu>
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->
        <a class="right-menu-item" href="" style="margin-left: 20px;">登录</a>
        <a class="right-menu-item" href="">注册</a>
      </template>

      <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click"> -->
      <div class="avatar-wrapper" witdh="20px">
        <img v-if="avatar" :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
        <i class="el-icon-caret-bottom" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'

export default {
  components: {
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    Search
  },
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
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #545c64;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

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
    line-height: 50px;
    margin-right: 200px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
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
