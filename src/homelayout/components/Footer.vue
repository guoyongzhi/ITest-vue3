<template>
  <footer>
    <div class="footer box">
      <div class="wx-box">
        <ul>
          <li>
            <img src="../../assets/images/wx.png">
            <span>我的微信</span>
          </li>
          <li>
            <img src="../../assets/images/wx.png">
            <span>我的微信</span>
          </li>
        </ul>
      </div>
      <div class="end-nav">
        <p><b>站点声明：</b></p>
        <p>1、本站均为本人设计，个人可以使用，但是未经许可不得用于任何商业目的。</p>
        <p>
          2、所有文章未经授权禁止转载、摘编、复制或建立镜像，如有违反，追究法律责任。举报邮箱：
          <a target="_blank" href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=Dn16d2Jrd2FgaU5-fyBtYWM">1983496818@qq.com</a>
        </p>
        <p>Copyright © <a href="https://www.tengoyz.com" target="_blank">www.tengoyz.com</a> All Rights Reserved. 备案号：<a href="http://beian.miit.gov.cn" target="_blank" rel="nofollow">粤ICP备19072537号-1</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    // msg: String
  },
  data: function() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
/*footer*/
footer { background: #333; width: 100%; padding: 30px 0; color: #777; font-size: 14px; position: relative; overflow: hidden;padding: 30px 0 70px; }
footer { padding: 30px 0 70px }
footer:before { content: ""; background: #34aadc linear-gradient(to left, #1487f4, #5ac8fa, #007aff, #5ac8fa); height: 10px; width: 100%; position: absolute; top: 0; left: 0; }
.box,.article-box { width: 1170px; margin: auto; overflow: hidden;margin-top: 10px}
.wx-box { overflow: hidden; float: left; margin-right: 20px }
.wx-box li { float: left; margin: 0 10px; text-align: center;width: 100px; }
.wx-box img { height: 100px }

/* .wx-box { width: 100%; text-align: center; margin-bottom: 20px }
.wx-box li { float: none; display: inline-block } */

.end-nav b { font-size: 16px; color: #34aadc; margin-bottom: 15px; display: block; }
.end-nav p { margin-bottom: 5px }
.end-nav a { color: #777 }
.end-nav a:hover { text-decoration: underline }

</style>

