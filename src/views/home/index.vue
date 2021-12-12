<template>
  <div class="app">
    <div class="back">
      <img src="../../assets/images/back.jpg">
      <h3>知识决定未来</h3>
    </div>
    <div class="text">
      <p>落红不是无情物，化作春泥更护花。</p>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      index: 0,
      time: 2000
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped>
img {width: 100%; }
    /*.container {overflow: hidden;}*/
h3 {margin-top: -55%; margin-left: 20%; margin-bottom: 0%;}
p {writing-mode:lr-tb;width: 10px; margin-left: 70%; margin-top: 50px; font-size: 28px;}
</style>
