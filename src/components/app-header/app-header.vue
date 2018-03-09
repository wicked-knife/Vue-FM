<template>
  <div id='app-header'>
    <div id='app-logo-warpper'>
      <img src="../../logo/logo.png">
      <span>波斯FM</span>
    </div>
    <i class='iconfont icon-people' id='me' @click='navigateToCenter'></i>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToCenter () {
      this.$router.push({
        path: '/center'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/style/index.scss';
#app-header{
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color:$theme-color;
  font-size: 16px;
  #app-logo-warpper{
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    img{
      width: 40px;
      height: 40px;
    }
  }
  i{
    font-size: 24px;
    padding: 0 10px 0 5px;
  }
}
</style>
