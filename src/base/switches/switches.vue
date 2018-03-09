<template>
  <div id='switches'>
    <ul id='switches-warpper'>
      <li v-for='(item, index) in switches' class='switch-item' :class='{"active": index === currentIndex}' @click='switched(index)' :key='index'>
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array
    },
    currentIndex: {
      type: Number
    }
  },
  methods: {
    switched (index) {
      this.$emit('switch', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/style/index.scss';
#switches {
  box-sizing: border-box;
  padding: 0 80px;
  #switches-warpper {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid #999;
    .switch-item{
      width: 100%;
      text-align: center;
      height: 30px;
      background-color: #333;
      color:#aaa;
      display: flex;
      align-items: center;
      justify-content: center;
      &:not(:last-child){
        border-right: 1px solid $theme-color;
      }
      &:first-child{
        border-radius: 5px 0 0 5px;
      }
      &:last-child{
        border-radius: 0 5px 5px 0;
      }
      &.active{
        background-color: $theme-color;
        color:#fff;
      }
    }
  }
}
</style>
