<template>
  <div id='app-nav-bar' ref='nav-bar'>
    <div id='nav-item-warpper' ref='nav-item-warpper'>
      <span v-for='(nav, index) in navList' :key='index' class='nav-item' ref='nav-item' @click='navigateTo(nav, index)' :class="{'active': index === currentNav}">{{nav.channel}}</span>
    </div>
  </div>
</template>

<script>
import dataBase from './data-base'
import BetterScroll from 'better-scroll'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      navList: dataBase,
      nav: {},
      currentNav: 0
    }
  },
  mounted () {
    // 刷新页面后将当前频道与频道分类设置为默认值
    this.setChannel(this.navList[this.currentNav])
    this.setChannelType(this.navList[this.currentNav].list[0])
    this._handleScroll()
  },
  methods: {
    _handleScroll () {
      this.nav = new BetterScroll(this.$refs['nav-bar'], {scrollX: true, click: true})
      var windowWidth = window.innerWidth
      var width = windowWidth / 5
      this.$refs['nav-item'].forEach((item) => {
        item.style.width = width + 'px'
      })
      var maxWidth = width * this.$refs['nav-item'].length
      this.$refs['nav-item-warpper'].style.width = maxWidth + 'px'
    },
    navigateTo (nav, index) {
      this.currentNav = index
      this.setChannel(nav)
      this.setChannelType(nav.list[0])
    },
    ...mapMutations({
      setChannel: 'setChannel',
      setChannelType: 'setChannelType'
    })
  }
}
</script>

<style scoped lang='scss'>
@import '../../common/style/index.scss';
#app-nav-bar{
  height: 30px;
  width: 100%;
  overflow: hidden;
  #nav-item-warpper{
    height: 100%;
    white-space: nowrap;
    .nav-item{
      display: inline-block;
      line-height: 30px;
      text-align: center;
      color: $color-d;
      font-size: 14px;
    }
  }
}
.active{
  color:$theme-color !important;
  @include border-bottom-1px($theme-color);
}
</style>
