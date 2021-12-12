<template>
  <div class="profile">
    <div class="head">
      <el-card v-for="(users, index) in userInfo" :key="index" class="box-card">
        <div slot="header" class="clearfix">
          <span>姓名:{{ users.name }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" />
        </div>
        <div class="text item">
          学历:{{ users.education }}
        </div>
        <div class="text item">
          个人成就:{{ users.achievement }}
        </div>
        <div class="text item">
          个人介绍:{{ users.introduction }}
        </div>
        <div class="text item">
          人生格言:{{ users.aphorism }}
        </div>
      </el-card>
    </div>
    <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="100">
        <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
        >
          回到顶部
        </div>
      </el-backtop> -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      userInfo: [{ name: '郭永志', education: '大专', achievement: '工作成就很多很多', introduction: '个人介绍111111', aphorism: '世上无难事只怕有心人。' }]
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";

}
.clearfix:after {
  clear: both
}

.box-card {
  background-color: rgb(136, 136, 206);
  width: 480px;
  margin-left: 25%;
}
</style>
