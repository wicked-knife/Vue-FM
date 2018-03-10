<template>
  <div id='FM-player' v-if="show && currentAudio">
    <audio :src="currentAudio.audioUrl" ref='audio' @canplay='ready' @timeupdate='updateTime($event)'></audio>
    <transition name='normal'>
      <div id='normal-player' v-show="fullScreen">
        <div id='player-header' @click.stop='test'>
          <i class='iconfont icon-unfold' @click.stop='minimize'></i>
          <i class='iconfont icon-likefill' @click.stop='toggleFavorite' :class='{"favorite": isFavorite}'></i>
          <img :src="show.cover" id='player-image'>
        </div>
        <process-bar :currentTime='currentTime' :totalTime='currentAudio.duration' @progressChange='changeProgress' @error="error" v-if='currentAudio.duration' @ended='end'></process-bar>
        <div id='player-control-panel'>
          <div id='player-info'>
            <p id='player-name'>{{currentAudio.name}}</p>
            <p id='player-owner'>{{show.owner}}</p>
          </div>
          <div id='prev-panel' @click.stop='prev'>
            <i class='iconfont icon-skipprevious'></i>
          </div>
          <div id='play-pause-panel' @click.stop='toggglePlaying'>
            <i class='iconfont icon-playfill' v-show="!playingState"></i>
            <i class='iconfont icon-stop' v-show="playingState"></i>
          </div>
          <div id="next-panel" @click.stop='next'>
            <i class='iconfont icon-skipnext'></i>
          </div>
        </div>
      </div>
    </transition>
    <transition name='mini'>
      <div id='mini-player' v-show='!fullScreen' @click.stop='maximize'>
        <div id='mini-player-bar' :style='{"width":percent+"%"}'></div>
        <img :src="show.cover" id='mini-player-image'>
        <div id='mini-player-info'>
          <p id='mini-player-name'>{{currentAudio.name}}</p>
          <p id='mini-player-owner'>{{show.owner}}</p>
        </div>
        <div id='mini-player-panel' @click.stop='toggglePlaying'>
          <i class='iconfont icon-playfill' v-show="!playingState"></i>
          <i class='iconfont icon-stop' v-show="playingState"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import processBar from '@/components/process-bar/process-bar'
import { mapGetters, mapMutations } from 'vuex'
import { toggleFavorite } from '@/common/js/mixin'
export default {
  mixins: [toggleFavorite],
  data () {
    return {
      audio: {},
      canPlay: false,
      currentTime: 0,
      percent: 0
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'setFullScreen',
      setPlayingState: 'setPlayingState',
      setCurrentIndex: 'setCurrentIndex'
    }),
    minimize () {
      this.setFullScreen(false)
    },
    maximize () {
      this.setFullScreen(true)
    },
    toggglePlaying () {
      this.setPlayingState(!this.playingState)
      this.playingState ? this.audio.play() : this.audio.pause()
    },
    prev () {
      if (this.canPlay) {
        let index = this.currentIndex - 1
        index < 0
          ? this.setCurrentIndex(this.show.audioList.length - 1)
          : this.setCurrentIndex(index)
      }
      this.canPlay = false
      this.setPlayingState(true)
    },
    next () {
      if (this.canPlay) {
        let index = this.currentIndex + 1
        index === this.show.audioList.length
          ? this.setCurrentIndex(0)
          : this.setCurrentIndex(index)
      }
      this.canPlay = false
      this.setPlayingState(true)
    },
    end () {
      this.next()
    },
    updateTime (event) {
      this.currentTime = event.target.currentTime
      this.percent = Math.floor(
        this.currentTime / this.currentAudio.duration * 100
      )
      if (!this.audio.currentTime) {
        this.audio = event.target
      }
    },
    test () {},
    error () {
      this.canPlay = true
    },
    changeProgress (percent) {
      this.percent = percent
      let time = this.currentAudio.duration
      let currentTime = time * (percent / 100)
      this.audio.currentTime = currentTime
    },
    ready () {
      this.canPlay = true
      if (this.playingState) {
        this.audio.play()
      }
    }
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playingState',
      'show',
      'currentAudio',
      'currentIndex'
    ])
  },
  watch: {
    currentAudio (newval, oldval) {
      if (newval.audioUrl) {
        this.audio = this.$refs.audio
      }
    },
    playingState (newval) {
      newval ? this.audio.play() : this.audio.pause()
    },
    show (newval, oldval) {
      if (newval.id !== oldval.id) {
        //  改变节目时将当前index重置为0
        this.setCurrentIndex(0)
      }
    }
  },
  components: {
    processBar
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
#FM-player {
  #normal-player {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $bg-color;
    z-index: 2;
    #player-header {
      width: 100%;
      padding-top: 80%;
      position: relative;
      .icon-unfold {
        position: absolute;
        color: $theme-color;
        top: 0;
        left: 0;
        padding: 0 5px 0 15px;
        z-index: 1;
        font-size: 24px;
      }
      .icon-likefill {
        position: absolute;
        color: $theme-color;
        font-size: 24px;
        padding: 0 15px 0 5px;
        z-index: 3;
        top: 0;
        right: 0;
      }
      #player-image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        filter: grayscale(50%);
      }
    }
    #player-control-panel {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40%;
      position: relative;
      #player-info {
        position: absolute;
        left: 10px;
        top: 8%;
        #player-name {
          font-size: 22px;
          color: #fff;
          width: 350px;
          @include no-wrap();
        }
        #player-owner {
          font-size: 16px;
          color: #999;
        }
      }
      #prev-panel {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $theme-color;
        border-radius: 50%;
        i {
          font-size: 40px;
          color: #222;
        }
      }
      #play-pause-panel {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $theme-color;
        border-radius: 50%;
        margin: 0 15%;
        i {
          font-size: 65px;
          color: #222;
        }
      }
      #next-panel {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $theme-color;
        border-radius: 50%;
        i {
          font-size: 40px;
          color: #222;
        }
      }
    }
  }
  #mini-player {
    position: fixed;
    height: 60px;
    background: #222;
    bottom: 0;
    width: 100%;
    z-index: 2;
    overflow: hidden;
    #mini-player-bar {
      height: 2px;
      background-color: $theme-color;
    }
    #mini-player-image {
      float: left;
      width: 58px;
      height: 58px;
      margin-right: 5px;
    }
    #mini-player-info {
      float: left;
      #mini-player-name {
        color: #eee;
        font-size: 14px;
        padding-top: 5px;
        width: 260px;
        @include no-wrap();
      }
      #mini-player-owner {
        padding-top: 5px;
        color: #aaa;
        font-size: 12px;
      }
    }
    #mini-player-panel {
      position: absolute;
      width: 40px;
      height: 40px;
      background-color: $theme-color;
      border-radius: 50%;
      text-align: center;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      i {
        font-size: 30px;
        color: #222;
        line-height: 40px;
      }
    }
  }
}
.favorite{
  color:rgb(234,32,0) !important;
}
.normal-enter,
.normal-leave-to {
  transform: translateY(100%);
}
.normal-enter-active,
.normal-leave-active {
  transition: all 0.5s;
}
.mini-enter,
.mini-leave-to {
  transform: translateY(100%);
}
.mini-enter-active,
.mini-leave-active {
  transition: all 0.5s;
}
</style>
