<template>
  <transition name='down'>
    <div id='user-center-wrapper'>
      <i class='iconfont icon-back' @click.stop='back'></i>
      <i class='iconfont icon-deletefill' @click.stop='showTip'></i>
      <switches :switches='switchesArray' :currentIndex='currentIndex' @switch='switched' ref='switches'></switches>
      <div id='no-result-warpper'>
        <no-result text='没有收藏的电台' v-show="currentIndex === 0 && !favoriteList.length"></no-result>
        <no-result text='没有听过的电台' v-show="currentIndex === 1 && !listenedList.length"></no-result>
      </div>
      <div id='result-warpper' ref='result-warpper'>
        <div id='favorite-list-warpper' v-if="favoriteList.length" v-show="currentIndex === 0">
          <scroll :data='favoriteList.length' ref='scroll' name='favorite'>
            <transition-group id='favorite-list' tag='ul' name='favorite'>
              <li class='favorite-list-item' v-for="album in favoriteList" :key='album.id'>
                <i class='iconfont icon-likefill favorite-active' @click.stop='deleteFromFavorite(album)'></i>
                <album :album='album' @selectShow='onSelectShow'></album>
              </li>
            </transition-group>
          </scroll>
        </div>
        <div id='listened-list-warpper' v-if="listenedList.length" v-show="currentIndex === 1">
          <scroll :data='listenedList.length' ref='scroll' name='listen'>
            <ul id='listened-list'>
              <li class='listened-list-item' v-for="(album, index) in listenedList" :key='index'>
                <album :album='album' @selectShow='onSelectShow'></album>
              </li>
            </ul>
          </scroll>
        </div>
      </div>
      <confirm v-model="confirmShow" :hide-on-blur='true' title='确认清空该列表吗?' @on-confirm='_clearList' @on-cancel='_cancel'></confirm>
      <toast v-model="toastShow" type='warn' position='middle' text='列表为空'></toast>
    </div>
  </transition>

</template>

<script>
import switches from '@/base/switches/switches'
import noResult from '@/base/no-result/no-result'
import showList from '@/base/showList/showList'
import scroll from '@/base/scroll/scroll'
import album from '@/base/album/album'
import { Confirm, Toast } from 'vux'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      switchesArray: ['我收藏的', '我听过的'],
      currentIndex: 0,
      confirmShow: false,
      confirm: false,
      toastShow: false
    }
  },
  components: {
    switches,
    noResult,
    showList,
    album,
    scroll,
    Confirm,
    Toast
  },
  methods: {
    ...mapMutations({
      clearFavoriteList: 'clearFavoriteList',
      clearListenedList: 'clearListenedList',
      setFavoriteList: 'setFavoriteList'
    }),
    back () {
      this.$router.back()
    },
    switched (index) {
      this.currentIndex = index
      this.confirm = false
      //  scroll组件强制刷新
      if (this.favoriteList.length && this.listenedList.length) {
        this.$nextTick(() => {
          this.$refs['scroll'].refresh()
        })
      }
    },
    onSelectShow (album) {
      this.$router.push({
        path: `/channel/${album.id}`
      })
    },
    showTip () {
      switch (this.currentIndex) {
        case 0 :
          if (!this.favoriteList.length) {
            this.toastShow = true
          } else {
            this.confirmShow = true
          }
          break
        case 1 :
          if (!this.listenedList.length) {
            this.toastShow = true
          } else {
            this.confirmShow = true
          }
          break
      }
    },
    _clearList () {
      this.confirm = true
      if (this.confirm) {
        switch (this.currentIndex) {
          case 0:
            this.clearFavoriteList()
            break
          case 1:
            this.clearListenedList()
            break
        }
      }
    },
    _cancel () {
      this.confirmShow = false
    },
    deleteFromFavorite (album) {
      let index = this.favoriteList.findIndex((favorite, index) => {
        return favorite.id === album.id
      })
      let favoriteList = this.favoriteList.concat()
      favoriteList.splice(index, 1)
      this.setFavoriteList(favoriteList)
    }
  },
  computed: {
    ...mapGetters(['favoriteList', 'listenedList'])
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#user-center-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #222;
  z-index: 3;
  .icon-back {
    color: $theme-color;
    padding: 0 5px 0 15px;
    font-size: 24px;
  }
  .icon-deletefill {
    color:$theme-color;
    padding: 0 15px 0 5px;
    font-size: 24px;
    position: absolute;
    right: 0;
  }
  #no-result-warpper {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  #result-warpper {
    position: absolute;
    top: 70px;
    bottom: 0;
    overflow: hidden;
    #favorite-list-warpper {
      height: 100%;
      .icon-likefill{
        position: absolute;
        color: $theme-color;
        padding: 5px 10px 5px 10px;
        right: 0;
        z-index: 1;
      }
    }
    #listened-list-warpper {
      height: 100%;
    }
  }
}
.favorite-active{
  color:rgb(234,32,0) !important;
}
.down-enter,
.down-leave-to {
  transform: translate3d(100%, -100%, 0);
}
.down-enter-active,
.down-leave-active {
  transition: all 0.3s;
}
.favorite-enter,
.favorite-leave-to {
  transform: translateX(110%);
}
.favorite-enter-active,
.favorite-leave-active {
  transition: all 0.3s;
}
</style>
