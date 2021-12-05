<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title"> 测 试 管 理 平 台 </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="大写锁定已开启" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登陆</el-button>

      <!-- <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
        联系我们
      </el-button> -->
      <div style="position:relative">
        <!-- <div class="tips"> -->
        <!-- <span>Username : xxxx</span> -->
        <!-- <span>Password : ******</span> -->
        <!-- </div> -->
        <!-- <div class="tips"> -->
        <!-- <span style="margin-right:18px;">Username : xxxx</span> -->
        <!-- <span>Password : ******</span> -->
        <!-- </div> -->
        <el-button type="info" style="thirdparty-button" @click="RegistDialog=true">注册</el-button>
        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          联系我们
        </el-button>
      </div>
    </el-form>

    <el-dialog title="联系我们" :visible.sync="showDialog">
      不能对本地进行模拟，所以请结合自己的业务模拟! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
    <el-dialog title="注册" :visible.sync="RegistDialog">
      <el-form ref="dataForm" :rules="regsitRules" :model="loginForm" label-position="left" label-width="120px" style="margin-left:30px;margin-right:30px;">
        <el-form-item label="用户名" prop="username" placeholder="请输入用户名">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password" placeholder="请输入密码">
          <el-input
            v-model="loginForm.password"
            :type="passwordType"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span ref="textPawStyle">{{ textPaw }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="RegistDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="Regist">
          注册
        </el-button>
      </div>
    </el-dialog>
    <div slot="footer" class="footer">
      <span>Copyright 2021~2021 广州丹霄信息技术有限公司 | 粤ICP备1001001号</span>
    </div>
  </div>
</template>

<script>
import SocialSign from './components/SocialSignin'
import waves from '@/directive/waves' // waves directive
import { regist } from '@/api/user'
import { jsEncrypt } from '@/utils/aes'

export default {
  name: 'Login',
  components: { SocialSign },
  directives: { waves },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('用户名不能少于4位'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    const regsitPassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      }
      this.pawValue = this.checkStrong(value)
      if (this.pawValue >= 1) {
        this.textPaw = '弱'
        this.$refs.textPawStyle.style.color = 'red'
      }
      if (this.pawValue >= 2 && this.pawValue < 4) {
        this.textPaw = '中'
        this.$refs.textPawStyle.style.color = 'orange'
      }
      if (this.pawValue === 4) {
        this.textPaw = '强'
        this.$refs.textPawStyle.style.color = 'green'
      }
      // if (value.length < 6) {
      //   callback(new Error('密码不能少于6位'))
      // } else {
      callback()
      // }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'change', validator: validatePassword }]
      },
      regsitRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'change', validator: regsitPassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      RegistDialog: false,
      redirect: undefined,
      otherQuery: {},
      textPaw: ''
    }
  },
  // computed: {
  //   websoket() {
  //     console.log(this.$store.state.websocket.websoket)
  //     return this.$store.state.websocket.websoket ? this.$store.state.websocket.websoket : ''
  //   }
  // },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    Regist() {
      if (this.textPaw === '强' || this.textPaw === '中') {
        this.$message({
          type: 'warning',
          message: '密码太简单请重新输入密码'
        })
        this.loginForm.password = ''
        return false
      }
      regist({ username: this.loginForm.username.trim(), password: jsEncrypt(this.loginForm.password) }).then(response => {
        console.log(response)
        this.RegistDialog = false
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
          // this.$store.dispatch('websocket/addOpenEvent')
          // this.$store.dispatch('websocket/addCloseEvent')
          // this.$store.dispatch('websocket/createWs')
            .then(() => {
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('错误提交!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    checkStrong(sValue) {
      var modes = 0
      if (sValue.length < 1) return modes
      if (/\d/.test(sValue)) modes++
      if (/[a-z]/.test(sValue)) modes++
      if (/[A-Z]/.test(sValue)) modes++
      if (/\W/.test(sValue)) modes++
      switch (modes) {
        case 1:
          // return 1
          break
        case 2:
          // return 2
          break
        case 3:
          break
        case 4:
          // return sValue.length < 4 ? 3 : 4
          break
      }
      return modes
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  html,body{height: 100%;}

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  // .footer{flex: 0;background: red}
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url("http://192.168.1.163:6066/1211637-20190809112720089-1507550740.png");
  background-color: $bg;
  overflow: hidden;
  display: flex;flex-direction: column;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .footer{
    // flex: 1;
    width: 100%;
    position: fixed;
    text-align: center;
    bottom: 6px;
    // background: #2d3a4b
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
