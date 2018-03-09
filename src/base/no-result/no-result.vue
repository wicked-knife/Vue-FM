<template>
  <div id='no-result'>
    <i class='iconfont icon-musicforbidfill'></i>
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: `抱歉,暂无搜索结果`
    }
  }
}
</script>

<style lang="scss" scoped>
#no-result{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  i{
    font-size: 50px;
    color:rgba(100,100,100,.5);
  }
  p{
    font-size: 14px;
    color:rgba(100,100,100,.5);
  }
}
</style>
