<template>
<transition name='down'>
  <div id='user-center-wrapper'>
    <i class='iconfont icon-back' @click.stop='back'></i>
    <switches :switches='switchesArray' :currentIndex='currentIndex' @switch='switched'></switches>
    <!-- <show-list></show-list> -->
    <div id='no-result-warpper'>
      <no-result text='没有收藏的电台' v-show="currentIndex === 0 && !favoriteList.length"></no-result>
      <no-result text='没有听过的电台' v-show="currentIndex === 1"></no-result>
      <div id='favorite-list-warpper' v-if="favoriteList.length">
        <ul id='favorite-list'>
          <li class='favorite-list-item' v-for="(album, index) in favoriteList" :key='index'>
            <album :album='album'></album>
          </li>
        </ul>
      </div>
      <div id='listened-list-warpper'></div>
    </div>
  </div>
</transition>

</template>

<script>
import switches from '@/base/switches/switches'
import noResult from '@/base/no-result/no-result'
import showList from '@/base/showList/showList'
import album from '@/base/album/album'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      switchesArray: ['我收藏的', '我听过的'],
      currentIndex: 0
    }
  },
  components: {
    switches,
    noResult,
    showList,
    album
  },
  methods: {
    back () {
      this.$router.back()
    },
    switched (index) {
      this.currentIndex = index
    }
  },
  computed: {
    ...mapGetters(['favoriteList'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/style/index.scss';
#user-center-wrapper{
  position: fixed;
  left:0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #222;
  z-index: 3;
  .icon-back{
    color:$theme-color;
    padding: 0 5px 0 15px;
    font-size: 24px;
  }
  #no-result-warpper{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%)
  }
}
.down-enter,
.down-leave-to {
  transform: translate3d(100%, -100%, 0);
}
.down-enter-active,
.down-leave-active {
  transition: all 0.3s;
}
</style>
