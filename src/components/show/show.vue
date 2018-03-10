<template>
  <transition name='slide'>
    <div id='page-show-warpper'>
      <i class='iconfont icon-back' @click.stop="goBack"></i>
      <i class='iconfont icon-likefill' @click.stop='toggleFavorite' :class='{"favorite": isFavorite}'></i>
      <div id="show-page-header">
        <img :src="show.cover" id='show-bg-blur'>
        <div id='show-header-content'>
          <div id='show-image-warpper'>
            <img :src="show.cover" id='show-image'>
          </div>
          <div id='show-header-info'>
            <p id='show-name'>{{show.name}}</p>
            <p id='show-owner'>主播:{{show.owner}}</p>
            <p id='show-update'>更新时间:{{_transformUpdateTime(show.updateTime)}}</p>
          </div>
        </div>
      </div>
      <p id='show-page-desc'>
        {{show.desc}}
      </p>
      <div id="show-page-list">
        <h3 id='show-list-title'>节目列表</h3>
        <div id='show-scroll-warpper' ref='scroll-warpper'>
          <scroll :data='audioList' v-if='audioList.length' :pullup='true' @scrollToEnd='searchMore'>
            <show-list :audioList="show.audioList" @selectAudio='selectAudio' @quickPlay='quickPlay' ref='showList'></show-list>
          </scroll>
        </div>
      </div>
          <toast text='已无更多' type='cancel' v-model="failToastShow" position='top' ></toast>
    <toast text='加载完成' type='success' v-model="successToastShow" position='top' ></toast>
    <loading :show='loadingShow'></loading>
    </div>
  </transition>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import showList from '@/base/showList/showList'
import scroll from '@/base/scroll/scroll'
import { toggleFavorite } from '@/common/js/mixin'
import { getShowPlaylist, getPlaylistItem } from '../../common/api/api'
import { createAudio } from '@/common/js/ClassAudio'
import { Toast, Loading } from 'vux'
export default {
  mixins: [toggleFavorite],
  data () {
    return {
      audioList: [],
      start: 0,
      flag: false,
      hasMore: true,
      failToastShow: false,
      successToastShow: false,
      loadingShow: true,
      top: 0
    }
  },
  computed: {
    ...mapGetters(['show'])
  },
  methods: {
    ...mapMutations({
      setPlaylist: 'setPlaylist',
      setAudioList: 'setAudioList',
      setFullScreen: 'setFullScreen',
      setPlayingState: 'setPlayingState',
      setPlayingList: 'setPlayingList',
      setCurrentIndex: 'setCurrentIndex'
    }),
    goBack () {
      this.$router.back()
    },
    sortAudioList (list) {
      // 返回的数据是无序的,需要进行排序处理 返回的数据有一个上传时间属性,可根据这个属性进行排序
      var arr = []
      for (let k in list) {
        if (list.hasOwnProperty(k)) {
          arr.push(list[k].show)
        }
      }
      arr.sort(function (a, b) {
        return a.uploadTime - b.uploadTime
      })
      // 排序完毕
      // 创建audio实例
      arr = arr.map((audio, index) => {
        return createAudio(audio)
      })
      this.setAudioList(arr)
      this.flag = true
    },
    _fixAudioContentTop () {
      var warpper = this.$refs['scroll-warpper']
      var top = warpper.offsetTop
      warpper.style.top = top + 'px'
      warpper.style.bottom = '0px'
    },
    _transformUpdateTime (num) {
      var date = new Date(num * 1000)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      month > 9 ? void 0 : (month = `0${month}`)
      day > 9 ? void 0 : (day = `0${day}`)
      return `${year}-${month}-${day}`
    },
    searchMore () {
      if (this.hasMore) {
        this.start += 10
        this._getPlaylistData()
        this.successToastShow = true
      } else {
        this.failToastShow = true
      }
    },
    _getPlaylistData () {
      getShowPlaylist(this.show.id).then(res => {
        this.setPlaylist(res.data)
        getPlaylistItem(this.show.id, this.start, this.show.playlist).then(
          res => {
            try {
              var tempList = res.data.data.showList
            } catch (error) {
              this.hasMore = false
            }
            this.sortAudioList(tempList)
            this.loadingShow = false
          }
        )
      })
    },
    selectAudio (audio, index) {
      this.setFullScreen(true)
      this.setPlayingState(true)
      this.setCurrentIndex(index)
    },
    quickPlay (audio, index) {
      this.setPlayingState(true)
      this.setCurrentIndex(index)
    }
  },
  watch: {
    flag (newval, oldval) {
      if (newval) {
        this.audioList = this.show.audioList
        this.flag = false
      }
    },
    show (newval, oldval) {
      this.hasMore = true
    }
  },
  created () {
    this._getPlaylistData()
  },
  mounted () {
    this._fixAudioContentTop()
  },
  components: {
    showList,
    scroll,
    Toast,
    Loading
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#page-show-warpper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: $bg-color;
  z-index: 2;
  .icon-back {
    position: absolute;
    color: $theme-color;
    font-size: 24px;
    padding: 0 5px 0 15px;
    z-index: 3;
  }
  .icon-likefill {
    position: absolute;
    color: $theme-color;
    font-size: 24px;
    padding: 0 15px 0 5px;
    z-index: 3;
    right: 0;
  }
  #show-page-header {
    width: 100%;
    padding-top: 40%;
    position: relative;
    overflow: hidden;
    #show-bg-blur {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      filter: blur(10px);
      z-index: -1;
    }
    #show-header-content {
      position: absolute;
      top: 0;
      width: 100%;
      height: 70%;
      display: flex;
      margin-top: 10%;
      #show-image-warpper {
        flex: 0 0 100px;
        width: 100px;
        margin: 0 20px;
        #show-image {
          width: 100px;
          height: 100px;
        }
      }
      #show-header-info {
        color: $theme-color;
        #show-name {
          font-size: 20px;
          color: #eee;
          line-height: 36px;
          width: 220px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        #show-owner {
          font-size: 15px;
        }
        #show-update {
          font-size: 15px;
          margin-top: 10px;
        }
      }
    }
  }
  #show-page-desc {
    padding: 5px 10px 5px 10px;
    box-sizing: border-box;
    width: 100%;
    max-height: 70px;
    background-color: #2c2c2c;
    color: #eee;
    line-height: 16px;
    overflow: hidden;
  }
  #show-page-list {
    #show-list-title {
      font-size: 18px;
      text-align: center;
      line-height: 30px;
      color: #eee;
      font-weight: normal;
    }
    #show-scroll-warpper {
      position: absolute;
      width: 100%;
      overflow: hidden;
    }
  }
}
.favorite{
  color: rgb(234, 32, 0) !important;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
</style>
