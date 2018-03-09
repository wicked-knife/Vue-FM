<template>
  <ul id='show-list' v-if="audioList.length">
    <li class='show-list-item' v-for="(audio, index) in audioList" :key='index' @click='selectAudio(audio, index)'>
      <i class='iconfont icon-video' :class="{'current': audio === currentAudio}" @click.stop='quickPlay(audio, index)'></i>
      <div class='list-item-info'>
        <p class='list-item-name'>{{audio.name}}</p>
        <p class='list-item-duration'><i></i>{{_transfromDuration(audio.duration)}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: {
    audioList: {}
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['currentAudio'])
  },
  methods: {
    _transfromDuration (num) {
      var minutes = Math.floor(num / 60)
      var seconds = num % 60
      minutes > 9 ? minutes = `${minutes}:` : minutes = `0${minutes}:`
      seconds > 9 ? void (0) : seconds = `0${seconds}`
      return minutes + seconds
    },
    selectAudio (audio, index) {
      this.$emit('selectAudio', audio, index)
    },
    quickPlay (audio, index) {
      this.$emit('quickPlay', audio, index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
    #show-list{
      padding-bottom: 60px;
      .show-list-item{
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        @include border-bottom-1px(#666);
        margin-bottom: 10px;
        .icon-video{
          font-size: 24px;
          padding: 0 15px;
          color:#ccc;
        }
        .list-item-name{
          font-size: 16px;
          color:#ddd;
        }
        .list-item-duration{
          font-size: 12px;
          color: #888;
        }
      }
    }
    .current {
      color:$theme-color !important;
    }
</style>
