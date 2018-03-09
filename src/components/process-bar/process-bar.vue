<template>
<div id="player-warpper">
  <div id='process-bar-warpper' @click.stop.prevent='_clickSetPercent($event)' ref='bar'>
    <div id='process-bar' :style='{"width":percent+"%"}'></div>
    <div id='process-block' @touchmove='_slideSetPercent($event)' @touchend='_touchend' :style='{"left":percent+"%"}'></div>
  </div>
  <div id="process-time">
    <span id='current-time'>{{_formatTime(currentTime)}}</span>
    <span id='total-time'>{{_formatTime(totalTime)}}</span>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      percent: {
        type: Number,
        default: 0
      },
      isMove: false
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: 0
    },
    totalTime: {
      type: Number,
      default: 0
    }
  },
  methods: {
    _clickSetPercent (event) {
      let clickLeft = event.pageX
      this._calcPercent(clickLeft)
    },
    _slideSetPercent (event) {
      let touchLeft = event.touches[0].pageX
      this.isMove = true
      this._calcPercent(touchLeft)
    },
    _calcPercent (left) {
      let length = this.$refs['bar'].clientWidth
      let percent = Math.floor((left / length) * 100)
      percent > 100 ? percent = 100 : percent = percent + 0
      percent < 0 ? percent = 0 : percent = percent + 0
      this.percent = percent
      if (!this.isMove) {
        this.$emit('progressChange', this.percent)
      }
    },
    _autoUpdatePercent () {
      if (!this.isMove) {
        this.percent = Math.floor((this.currentTime / this.totalTime) * 100)
      }
    },
    _touchend () {
      this.isMove = false
      this.$emit('progressChange', this.percent)
    },
    _formatTime (time) {
      let min = this._pad(Math.floor(time / 60), 2)
      let sec = this._pad(Math.floor(time % 60), 2)
      return `${min}:${sec}`
    },
    _pad (num, len) {
      let length = num.toString().length
      while (length < len) {
        num = '0' + num
        length++
      }
      return num
    }
  },
  watch: {
    currentTime () {
      this._autoUpdatePercent()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/style/index.scss';
#player-warpper{
  #process-bar-warpper{
    width: 100%;
    height: 10px;
    background-color: #666;
    position: relative;
    #process-bar{
      position: absolute;
      height: 100%;
      background-color: $theme-color;
    }
    #process-block{
      width: 10px;
      height: 10px;
      position: absolute;
      background-color: #fff;
    }
  }
  #process-time{
    line-height: 18px;
    color:#ccc;
    #current-time{
      float: left;
      margin-left: 5px;
    }
    #total-time{
      float: right;
      margin-right: 5px;
    }
  }
}

</style>
